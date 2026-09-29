import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function MoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="12" cy="19" r="1.75" />
    </svg>
  );
}

function PopoverOrigin({ fromTrigger = false }: { fromTrigger?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-start">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="popover"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-full left-0 mb-2 w-44 rounded-lg bg-surface-default p-3 shadow-lg ring-1 ring-line-default ${fromTrigger ? "origin-bottom-left" : "origin-center"}`}
          >
            <p className="text-content-primary text-sm font-medium">Sort by</p>
            <p className="text-content-secondary mt-1 text-xs">
              Name, date, or size
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Button
        type="button"
        variant="ghost"
        shape="round"
        icon
        aria-label="Options"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <MoreIcon />
      </Button>
    </div>
  );
}

export default function PopoverOriginDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Center"
      withLabel="From control"
      contentClassName="flex w-full justify-center"
      without={<PopoverOrigin />}
      with={<PopoverOrigin fromTrigger />}
    />
  );
}
