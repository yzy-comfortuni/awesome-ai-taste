const CACHE_TTL_SECONDS = 60 * 60 * 24;
const CACHE_STALE_AFTER_MS = CACHE_TTL_SECONDS * 1000;
const MAX_CONTENT_BYTES = 1024 * 1024;
const FETCH_TIMEOUT_MS = 5000;

type CacheLike = {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
};

type CacheStorageLike = {
  default: CacheLike;
};

type RemoteSkillResult = {
  content: string;
  stale: boolean;
};

export class RemoteSkillError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const getCache = () =>
  (globalThis as typeof globalThis & { caches?: CacheStorageLike }).caches
    ?.default;

const readBoundedText = async (response: Response) => {
  const contentLength = Number(response.headers.get("content-length"));
  if (contentLength > MAX_CONTENT_BYTES) {
    throw new RemoteSkillError("Skill content is too large", 502);
  }

  if (!response.body) {
    const content = await response.text();
    if (new TextEncoder().encode(content).byteLength > MAX_CONTENT_BYTES) {
      throw new RemoteSkillError("Skill content is too large", 502);
    }
    return content;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_CONTENT_BYTES) {
        await reader.cancel();
        throw new RemoteSkillError("Skill content is too large", 502);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(bytes);
};

const readCachedContent = async (cache: CacheLike, key: Request) => {
  let cached: Response | undefined;
  try {
    cached = await cache.match(key);
  } catch {
    return undefined;
  }
  if (!cached) return undefined;

  try {
    const content = await readBoundedText(cached);
    const cachedAt = Number(cached.headers.get("x-ui-skills-cached-at"));
    return {
      content,
      stale:
        Number.isFinite(cachedAt) &&
        cachedAt > 0 &&
        Date.now() - cachedAt > CACHE_STALE_AFTER_MS,
    };
  } catch {
    return undefined;
  }
};

export const getRemoteSkill = async (
  rawUrl: string,
): Promise<RemoteSkillResult> => {
  const cache = getCache();
  const cacheKey = new Request(rawUrl);
  const cached = cache ? await readCachedContent(cache, cacheKey) : undefined;
  if (cached && !cached.stale) {
    return { content: cached.content, stale: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(rawUrl, {
      signal: controller.signal,
      headers: { Accept: "text/plain" },
    });

    if (!response.ok) {
      if (cached && response.status !== 404) {
        return { content: cached.content, stale: true };
      }
      throw new RemoteSkillError(
        "Skill source unavailable",
        response.status === 404 ? 404 : 502,
      );
    }

    const content = await readBoundedText(response);
    if (cache) {
      try {
        await cache.put(
          cacheKey,
          new Response(content, {
            headers: {
              "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
              "Content-Type": "text/plain; charset=utf-8",
              "x-ui-skills-cached-at": String(Date.now()),
            },
          }),
        );
      } catch {
        // Cache failures must not break skill content delivery.
      }
    }

    return { content, stale: false };
  } catch (error) {
    if (error instanceof RemoteSkillError && error.status === 404) {
      throw error;
    }
    if (cached) {
      return { content: cached.content, stale: true };
    }
    if (error instanceof RemoteSkillError) throw error;
    throw new RemoteSkillError("Error fetching registry skill", 504);
  } finally {
    clearTimeout(timeout);
  }
};
