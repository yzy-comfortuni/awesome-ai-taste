import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard, PlaybookSwitchRow } from "./demo-card";

const HOLD_MS = 1400;
const NORMAL_DURATION = 0.22;
const SLOWMO_DURATION = 0.8;
const MORPH_TRANSITION = {
  duration: 0.22,
  ease: "easeInOut" as const,
};

function CopyLabelButton({
  withBlur = false,
  duration,
}: {
  withBlur?: boolean;
  duration: number;
}) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const holdTimerRef = useRef<number | null>(null);
  const unlockTimerRef = useRef<number | null>(null);
  const morph = { ...MORPH_TRANSITION, duration };
  const morphMs = duration * 1000;

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
    };
  }, []);

  const handleCopy = () => {
    if (busy) return;

    setBusy(true);
    setCopied(true);

    holdTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      unlockTimerRef.current = window.setTimeout(() => {
        setBusy(false);
      }, morphMs);
    }, HOLD_MS);
  };

  return (
    <Button
      type="button"
      variant="outline"
      shape="round"
      onClick={handleCopy}
      className="min-w-24"
    >
      <span className="relative flex h-5 w-14 items-center justify-center overflow-hidden">
        <AnimatePresence mode="sync" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{
              opacity: 0,
              y: 6,
              filter: withBlur ? "blur(3px)" : "blur(0px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: morph,
            }}
            exit={{
              opacity: 0,
              y: -6,
              filter: withBlur ? "blur(3px)" : "blur(0px)",
              transition: morph,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {copied ? "Copied" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </span>
    </Button>
  );
}

export default function LabelMorphDemo() {
  const [slowMo, setSlowMo] = useState(false);
  const duration = slowMo ? SLOWMO_DURATION : NORMAL_DURATION;

  return (
    <PlaybookDemoCard
      controlsLayout="stack"
      withoutLabel="Hard fade"
      withLabel="Blur morph"
      contentClassName="flex w-full justify-center"
      headerExtra={
        <PlaybookSwitchRow
          layout="grid"
          id="label-morph-slowmo-switch"
          offLabel="Normal"
          onLabel="Slow mo"
          checked={slowMo}
          onCheckedChange={setSlowMo}
          aria-label="Animation speed"
        />
      }
      without={<CopyLabelButton duration={duration} />}
      with={<CopyLabelButton withBlur duration={duration} />}
    />
  );
}
