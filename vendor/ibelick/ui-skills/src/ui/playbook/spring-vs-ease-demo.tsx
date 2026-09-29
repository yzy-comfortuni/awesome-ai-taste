import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "../../lib/cn";
import { PlaybookDemoCard } from "./demo-card";

function NotificationsToggle({ useSpring = false }: { useSpring?: boolean }) {
  const [on, setOn] = useState(false);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((value) => !value)}
      className={cn(
        "relative h-7 w-12 rounded-full transition-colors duration-150 ease-out",
        on ? "bg-fill-inverse" : "bg-fill-strong",
      )}
    >
      <motion.span
        aria-hidden="true"
        className="absolute top-0.5 left-0.5 size-6 rounded-full bg-surface-default shadow-sm"
        animate={{ x: on ? 20 : 0 }}
        transition={
          useSpring
            ? { type: "spring", stiffness: 420, damping: 14 }
            : { duration: 0.15, ease: [0.16, 1, 0.3, 1] }
        }
      />
      <span className="sr-only">Notifications</span>
    </button>
  );
}

export default function SpringVsEaseDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Spring"
      withLabel="Ease-out"
      contentClassName="flex w-full justify-center"
      without={<NotificationsToggle useSpring />}
      with={<NotificationsToggle />}
    />
  );
}
