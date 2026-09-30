import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipProvider } from "./tooltip";

const STORAGE_KEY = "ui-skills-promo-dismissed";
const ROTATE_MS = 6000;
const EMAIL = "hello@interfaceoffice.com";

type SlideId = "mesurer" | "contact";
const slideOrder: SlideId[] = ["mesurer", "contact"];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // fall through
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function PromoBanner() {
  const reducedMotion = usePrefersReducedMotion();
  const [dismissed, setDismissed] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.dataset.promoDismissed === "1"
      : false,
  );
  const [slideIndex, setSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const pausedRef = useRef(false);

  const slide = slideOrder[slideIndex];

  useEffect(() => {
    if (dismissed) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      setCopied(false);
      setSlideIndex((i) => (i + 1) % slideOrder.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [dismissed]);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    document.documentElement.dataset.promoDismissed = "1";
    setDismissed(true);
  }

  async function onCopyEmail() {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    try {
      await copyToClipboard(EMAIL);
    } catch {
      setCopied(false);
    }
  }

  if (dismissed) return null;

  const cardMotion = reducedMotion
    ? { initial: false as const, animate: { y: 0 }, exit: { y: 0 } }
    : {
      initial: { y: "100%" as const },
      animate: { y: 0 },
      exit: { y: "100%" as const },
    };

  return (
    <div
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 w-[min(20rem,calc(100vw-2rem))]"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        pausedRef.current = false;
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.aside
          key={slide}
          data-promo-banner
          aria-label="Promotion"
          className="promo-banner relative isolate w-full rounded-lg border-none bg-surface-default p-3 shadow-xs ring-1 ring-line-default"
          initial={cardMotion.initial}
          animate={cardMotion.animate}
          exit={cardMotion.exit}
          transition={{
            duration: reducedMotion ? 0 : 0.2,
            ease: "easeOut",
          }}
        >
          <button
            type="button"
            className="promo-banner__close text-content-secondary hover:bg-fill-strong focus-visible:outline-content-primary absolute top-1.5 right-1.5 inline-flex size-6 cursor-pointer items-center justify-center rounded-[calc(0.5rem-0.375rem)] transition-opacity duration-150 ease-out focus-visible:outline-1 focus-visible:outline-offset-2"
            aria-label="Dismiss promotion"
            onClick={dismiss}
          >
            <XMarkIcon className="size-3.5" aria-hidden="true" />
          </button>

          <div className="pr-5">
            {slide === "mesurer" ? (
              <a
                href="https://mesurer.dev"
                target="_blank"
                rel="noopener noreferrer"
                data-s-event="partner_click"
                data-s-event-props="partner=mesurer"
                className="focus-visible:outline-content-primary flex w-full items-start gap-2.5 rounded-md focus-visible:outline-1 focus-visible:outline-offset-2"
              >
                <MesurerLogo />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[14px] font-[450] text-content-primary">
                    Mesurer
                  </span>
                  <span className="text-[14px] leading-snug text-content-secondary">
                    Build precise software with your coding agent.
                  </span>
                </span>
              </a>
            ) : (
              <p className="text-[14px] leading-snug text-content-primary text-pretty">
                If you want to promote to{" "}
                <span className="tabular-nums">80k+</span> unique visitors and put
                your product here,{" "}
                <TooltipProvider>
                  <Tooltip
                    side="top"
                    closeOnClick={false}
                    content={copied ? "Copied!" : "Copy email"}
                  >
                    <button
                      type="button"
                      onClick={onCopyEmail}
                      className="cursor-pointer underline underline-offset-2 focus-visible:outline-content-primary rounded-sm focus-visible:outline-1 focus-visible:outline-offset-2"
                    >
                      contact us
                    </button>
                  </Tooltip>
                </TooltipProvider>
                <span className="sr-only" aria-live="polite">
                  {copied ? "Copied!" : ""}
                </span>
              </p>
            )}
          </div>
        </motion.aside>
      </AnimatePresence>
    </div>
  );
}

function MesurerLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      className="size-5 shrink-0"
    >
      <path
        fill="#FE0100"
        d="M15.9284 66.1694C16.1171 66.1694 16.2912 66.1071 16.4313 66.0019L52.9962 29.437C53.1014 29.2969 53.1637 29.1227 53.1637 28.9341V14.6605V13.3355C53.1637 12.8974 52.7823 12.9507 52.4936 13.167L52.3242 13.3364L0.3307 65.3299C0.0244677 65.5592 -0.226911 66.1694 0.329795 66.1694H15.9284Z"
      />
      <path
        fill="#FE0100"
        d="M79.1627 66.1693C79.6258 66.1693 80.0013 65.7938 80.0013 65.3307V13.0168C79.9471 13.0058 79.8909 13 79.8334 13C79.5588 13 79.315 13.132 79.162 13.336L27.168 65.33C26.964 65.483 26.832 65.7268 26.832 66.0014C26.832 66.1676 27.0234 66.1693 27.1674 66.1693H42.766C42.9546 66.1693 43.1288 66.107 43.2689 66.0018L43.4371 65.8336L66.2475 43.0232C66.2475 43.0232 66.4495 42.8157 66.5832 42.7573V43.5262V44.295V65.3307C66.5832 65.7938 66.9586 66.1693 67.4218 66.1693H79.1627Z"
      />
    </svg>
  );
}
