import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

import { ReplayButton } from "./replay-button";

const item = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function HeroEnter({
  staggered = false,
  animationKey = 0,
}: {
  staggered?: boolean;
  animationKey?: number;
}) {
  return (
    <motion.div
      key={animationKey}
      initial="hidden"
      animate="visible"
      variants={
        staggered
          ? { visible: { transition: { staggerChildren: 0.1 } } }
          : { visible: { transition: { staggerChildren: 0 } } }
      }
      className="max-w-xs space-y-2 text-center"
    >
      <motion.h3
        variants={item}
        className="text-content-primary text-xl font-medium tracking-tight"
      >
        Welcome back
      </motion.h3>
      <motion.p variants={item} className="text-content-secondary text-sm">
        Pick up where you left off with your latest drafts.
      </motion.p>
      <motion.div variants={item} className="pt-1">
        <Button shape="round" size="sm">
          Open library
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function StaggerEnterDemo() {
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <PlaybookDemoCard
      withoutLabel="All at once"
      withLabel="Staggered"
      contentClassName="flex w-full justify-center"
      belowControls={
        <ReplayButton
          label="Replay animation"
          onClick={() => setAnimationKey((key) => key + 1)}
        />
      }
      without={<HeroEnter animationKey={animationKey} />}
      with={<HeroEnter staggered animationKey={animationKey} />}
    />
  );
}
