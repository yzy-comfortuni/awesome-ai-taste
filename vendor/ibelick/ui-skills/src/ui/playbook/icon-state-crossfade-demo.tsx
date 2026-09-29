import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const SPRING = { type: "spring" as const, duration: 0.3, bounce: 0 };
const RESET_MS = 2000;

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path strokeLinecap="round" d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5 9.5 17 19 7" />
    </svg>
  );
}

function CopyButton({ animated = false }: { animated?: boolean }) {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleCopy = () => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    setCopied(true);
    resetTimerRef.current = window.setTimeout(() => setCopied(false), RESET_MS);
  };

  const icon = copied ? <CheckIcon /> : <CopyIcon />;

  return (
    <Button
      type="button"
      variant="outline"
      shape="round"
      icon
      aria-label={copied ? "Copied" : "Copy link"}
      onClick={handleCopy}
      className={copied ? "bg-fill-subtle" : undefined}
    >
      {animated ? (
        <span className="relative size-4">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              transition={SPRING}
              className="absolute inset-0"
            >
              {icon}
            </motion.span>
          </AnimatePresence>
        </span>
      ) : (
        icon
      )}
    </Button>
  );
}

export default function IconStateCrossfadeDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Instant swap"
      withLabel="Crossfade"
      contentClassName="flex w-full justify-center"
      without={<CopyButton />}
      with={<CopyButton animated />}
    />
  );
}
