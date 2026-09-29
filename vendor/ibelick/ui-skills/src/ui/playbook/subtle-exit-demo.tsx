import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const enterTransition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const };
const subtleExitTransition = { duration: 0.15, ease: "easeOut" as const };
const dramaticExitTransition = { duration: 0.4, ease: "easeOut" as const };

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  );
}

function SaveToastDemo({ subtleExit = false }: { subtleExit?: boolean }) {
  const toastId = useId();
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!toastVisible) return;

    const timer = window.setTimeout(() => setToastVisible(false), 2000);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Button
        shape="round"
        onClick={() => setToastVisible(true)}
        disabled={toastVisible}
        aria-describedby={toastVisible ? toastId : undefined}
      >
        Save
      </Button>

      <div className="relative mt-3 h-9 w-full">
        <AnimatePresence>
          {toastVisible ? (
            <motion.div
              key="save-toast"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: enterTransition,
              }}
              exit={
                subtleExit
                  ? {
                      opacity: 0,
                      y: -6,
                      transition: subtleExitTransition,
                    }
                  : {
                      opacity: 0,
                      y: -24,
                      scale: 0.96,
                      transition: dramaticExitTransition,
                    }
              }
              style={{ transformOrigin: "top center" }}
              id={toastId}
              className="bg-fill-inverse absolute top-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg px-3.5 py-2 text-sm whitespace-nowrap text-content-inverse shadow-lg"
            >
              <CheckIcon />
              Saved to library
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SubtleExitDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Dramatic"
      withLabel="Subtle exit"
      contentClassName="absolute inset-0"
      without={<SaveToastDemo />}
      with={<SaveToastDemo subtleExit />}
    />
  );
}
