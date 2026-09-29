import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const EXIT_TRANSITION = { duration: 0.15, ease: [0.4, 0, 1, 1] as const };

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="12" cy="19" r="1.75" />
    </svg>
  );
}

function OptionsMenu({ exitAnimation = false }: { exitAnimation?: boolean }) {
  const [open, setOpen] = useState(false);
  const items = ["Rename", "Duplicate", "Share"];

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        shape="round"
        icon
        aria-label="Options"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <MoreIcon />
      </Button>

      {exitAnimation ? (
        <AnimatePresence>
          {open ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, scale: 0.96, transition: EXIT_TRANSITION }}
              className="absolute top-full left-0 z-10 mt-1.5 w-40 overflow-hidden rounded-lg bg-surface-default py-1 shadow-lg ring-1 ring-line-default"
            >
              {items.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-content-primary hover:bg-fill-subtle block w-full px-3 py-1.5 text-left text-sm"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : open ? (
        <div className="absolute top-full left-0 z-10 mt-1.5 w-40 overflow-hidden rounded-lg bg-surface-default py-1 shadow-lg ring-1 ring-line-default">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setOpen(false)}
              className="text-content-primary hover:bg-fill-subtle block w-full px-3 py-1.5 text-left text-sm"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function MenuExitDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Vanishes"
      withLabel="Fades out"
      contentClassName="flex w-full justify-center"
      without={<OptionsMenu />}
      with={<OptionsMenu exitAnimation />}
    />
  );
}
