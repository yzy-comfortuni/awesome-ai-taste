interface ImportMetaEnv {
  readonly PUBLIC_JOBS_API_URL?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "cloudflare:workers" {
  export const env: {
    PUBLIC_JOBS_API_URL?: string;
    PUBLIC_TURNSTILE_SITE_KEY?: string;
  };
}

interface TurnstileWidgetOptions {
  sitekey: string;
  action?: string;
  appearance?: "always" | "execute" | "interaction-only";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
}

interface Turnstile {
  render(element: HTMLElement, options: TurnstileWidgetOptions): string;
  reset(widgetId?: string): void;
  remove(widgetId?: string): void;
}

interface Window {
  turnstile?: Turnstile;
}
