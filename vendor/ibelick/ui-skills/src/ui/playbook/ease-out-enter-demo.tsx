import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard, PlaybookSwitchRow } from "./demo-card";

const MENU_DURATION = 0.2;
const SLOWMO_DURATION = 0.8;

const EASE_IN = [0.42, 0, 1, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="12" cy="19" r="1.75" />
    </svg>
  );
}

function OptionsMenu({
  easeOut = false,
  duration,
}: {
  easeOut?: boolean;
  duration: number;
}) {
  const [open, setOpen] = useState(false);
  const ease = easeOut ? EASE_OUT : EASE_IN;
  const transition = { duration, ease };

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

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition }}
            exit={{ opacity: 0, transition }}
            className="absolute top-full left-0 z-10 mt-1.5 w-40 overflow-hidden rounded-lg bg-surface-default py-1 shadow-lg ring-1 ring-line-default"
          >
            {["Rename", "Duplicate", "Share"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setOpen(false)}
                className="text-content-primary hover:bg-fill-subtle block w-full px-3 py-1.5 text-left text-sm"
              >
                {item}
              </button>
            ))}
            <div className="bg-fill-strong my-1 h-px" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-red-600 hover:bg-fill-subtle block w-full px-3 py-1.5 text-left text-sm"
            >
              Delete
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function EaseOutEnterDemo() {
  const [slowMo, setSlowMo] = useState(false);
  const duration = slowMo ? SLOWMO_DURATION : MENU_DURATION;

  return (
    <PlaybookDemoCard
      controlsLayout="stack"
      withoutLabel="ease-in"
      withLabel="ease-out"
      contentClassName="flex w-full justify-center"
      headerExtra={
        <PlaybookSwitchRow
          layout="grid"
          id="ease-out-slowmo-switch"
          offLabel="Normal"
          onLabel="Slow mo"
          checked={slowMo}
          onCheckedChange={setSlowMo}
          aria-label="Animation speed"
        />
      }
      without={<OptionsMenu duration={duration} />}
      with={<OptionsMenu easeOut duration={duration} />}
    />
  );
}
