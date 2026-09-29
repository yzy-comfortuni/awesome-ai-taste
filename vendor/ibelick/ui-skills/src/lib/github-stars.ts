import { formatStarCount } from "./format-stars.ts";

type GitHubRepoResponse = {
  stargazers_count?: number;
};

type CacheLike = {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
};

type CacheStorageLike = {
  default: CacheLike;
};

export type GithubStars = {
  stars: number;
  label: string;
};

const REPO_URL = "https://api.github.com/repos/ibelick/ui-skills";
const CACHE_KEY = "https://www.ui-skills.com/api/github-stars";
const CACHE_SECONDS = 60 * 60 * 24;
const FETCH_TIMEOUT_MS = 5000;

export const getGithubStars = async (): Promise<GithubStars | null> => {
  const cache = (
    globalThis as typeof globalThis & { caches?: CacheStorageLike }
  ).caches?.default;
  const cacheKey = new Request(CACHE_KEY);
  let cached: Response | undefined;
  if (cache) {
    try {
      cached = await cache.match(cacheKey);
    } catch {
      cached = undefined;
    }
  }

  if (cached) {
    const cachedData = (await cached
      .clone()
      .json()
      .catch(() => null)) as GithubStars | null;

    if (
      (cachedData?.stars ?? 0) > 0 &&
      cachedData?.label &&
      cachedData.label !== "0+"
    ) {
      return cachedData;
    }
  }

  const headers = new Headers({
    Accept: "application/vnd.github+json",
    "User-Agent": "ui-skills",
  });

  const token = process.env.GITHUB_TOKEN;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    response = await fetch(REPO_URL, { headers, signal: controller.signal });
  } catch {
    return cached
      ? ((await cached
          .clone()
          .json()
          .catch(() => null)) as GithubStars | null)
      : null;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    return cached
      ? ((await cached
          .clone()
          .json()
          .catch(() => null)) as GithubStars | null)
      : null;
  }

  let payload: GitHubRepoResponse;
  try {
    payload = (await response.json()) as GitHubRepoResponse;
  } catch {
    return cached
      ? ((await cached
          .clone()
          .json()
          .catch(() => null)) as GithubStars | null)
      : null;
  }
  const stars = payload.stargazers_count ?? 0;

  if (stars <= 0) {
    return null;
  }

  const label = formatStarCount(stars);

  const result: GithubStars = { stars, label };
  const responseToCache = Response.json(result, {
    headers: {
      "Cache-Control": `public, max-age=0, s-maxage=${CACHE_SECONDS}, must-revalidate`,
    },
  });

  if (cache) {
    try {
      await cache.put(cacheKey, responseToCache.clone());
    } catch {
      // Cache failures must not break page rendering.
    }
  }

  return result;
};
