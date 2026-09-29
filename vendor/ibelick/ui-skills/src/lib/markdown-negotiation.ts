import { convert, estimateTokens } from "markdown-for-agents";

const HTML_CONTENT_TYPE = /^text\/html\b/i;
const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";

type MediaRange = {
  type: string;
  quality: number;
  index: number;
};

function parseAccept(accept: string): MediaRange[] {
  return accept
    .split(",")
    .map((part, index) => {
      const [rawType, ...params] = part.trim().split(";").map((s) => s.trim());
      const type = (rawType ?? "").toLowerCase();
      if (!type) return null;

      let quality = 1;
      for (const param of params) {
        const match = /^q\s*=\s*([0-9]*\.?[0-9]+)$/i.exec(param);
        if (match) {
          quality = Number(match[1]);
          break;
        }
      }

      return { type, quality: Number.isFinite(quality) ? quality : 0, index };
    })
    .filter((range): range is MediaRange => range !== null);
}

/** True when Accept explicitly prefers text/markdown over text/html. */
export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;

  const ranges = parseAccept(acceptHeader);
  // Browsers often send */*; only an explicit text/markdown means an agent ask.
  const markdown = ranges.find((range) => range.type === "text/markdown");
  if (!markdown || markdown.quality <= 0) return false;

  const html = ranges.find((range) => range.type === "text/html");
  if (!html) return true;

  if (markdown.quality !== html.quality) {
    return markdown.quality > html.quality;
  }

  // Equal quality: earlier Accept entry wins (Cloudflare-style negotiation).
  return markdown.index <= html.index;
}

export function isHtmlResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type");
  return contentType !== null && HTML_CONTENT_TYPE.test(contentType);
}

export function estimateTokenCount(text: string): number {
  return estimateTokens(text).tokens;
}

export function htmlToAgentMarkdown(html: string): {
  markdown: string;
  markdownTokens: number;
  originalTokens: number;
} {
  const originalTokens = estimateTokenCount(html);
  const { markdown, tokenEstimate } = convert(html, { extract: true });
  return {
    markdown,
    markdownTokens: tokenEstimate.tokens,
    originalTokens,
  };
}

function withVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const parts = existing.split(",").map((part) => part.trim().toLowerCase());
  if (!parts.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}

/** Convert an HTML response to Markdown for Agents when negotiated. */
export async function maybeNegotiateMarkdown(
  request: Request,
  response: Response,
): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return response;
  }
  if (!prefersMarkdown(request.headers.get("accept"))) {
    return response;
  }
  if (!isHtmlResponse(response)) {
    return response;
  }

  const html = await response.text();
  const { markdown, markdownTokens, originalTokens } =
    htmlToAgentMarkdown(html);

  const headers = new Headers(response.headers);
  headers.set("Content-Type", MARKDOWN_CONTENT_TYPE);
  headers.set("x-markdown-tokens", String(markdownTokens));
  headers.set("x-original-tokens", String(originalTokens));
  withVaryAccept(headers);

  // Body descriptors from the HTML response no longer apply.
  for (const header of [
    "content-length",
    "content-encoding",
    "content-range",
    "etag",
    "last-modified",
  ]) {
    headers.delete(header);
  }

  return new Response(request.method === "HEAD" ? null : markdown, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
