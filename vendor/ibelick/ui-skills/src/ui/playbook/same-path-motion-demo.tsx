import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const EASE = [0.16, 1, 0.3, 1] as const;
const TRANSITION = { duration: 0.28, ease: EASE };

function ToastDemo({ samePath = false }: { samePath?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <Button
        type="button"
        variant="outline"
        shape="round"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Dismiss" : "Show toast"}
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, x: 0, y: 0, transition: TRANSITION }}
            exit={
              samePath
                ? { opacity: 0, y: 28, transition: TRANSITION }
                : { opacity: 0, x: 40, transition: TRANSITION }
            }
            className="absolute right-5 bottom-5 w-48 rounded-xl bg-surface-default p-3 shadow-lg ring-1 ring-line-default"
          >
            <p className="text-content-primary text-sm font-medium">Draft saved</p>
            <p className="text-content-secondary mt-1 text-xs">Your changes are up to date.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function SamePathMotionDemo() {
  return (
    <PlaybookDemoCard
      flush
      withoutLabel="Mismatched path"
      withLabel="Same path"
      without={<ToastDemo />}
      with={<ToastDemo samePath />}
    />
  );
}
