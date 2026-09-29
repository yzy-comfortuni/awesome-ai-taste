import { useEffect, useState } from "react";
import { PlaybookDemoCard } from "./demo-card";
import { ReplayButton } from "./replay-button";

const paintingUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/960px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg";

function PaintingCard({ stable, replay }: { stable: boolean; replay: number }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    const timer = window.setTimeout(() => setLoaded(true), 650);
    return () => window.clearTimeout(timer);
  }, [replay]);

  return (
    <div className="w-40 text-left">
      <div
        className={
          stable
            ? "bg-fill-subtle aspect-3/4 overflow-hidden rounded-lg"
            : "bg-fill-subtle overflow-hidden rounded-lg"
        }
      >
        {loaded && !failed ? (
          <img
            key={replay}
            src={`${paintingUrl}?replay=${replay}`}
            alt="Impression, Sunrise by Claude Monet, a harbor scene with boats beneath an orange sun."
            className={
              stable
                ? "block size-full object-cover"
                : "block aspect-3/4 w-full object-cover"
            }
            width={stable ? 960 : undefined}
            height={stable ? 1245 : undefined}
            loading="eager"
            onError={() => setFailed(true)}
          />
        ) : stable || failed ? (
          <div
            className="bg-fill-subtle size-full min-h-24"
            role="img"
            aria-label="Image unavailable"
          />
        ) : (
          <div className="h-16" aria-hidden="true" />
        )}
      </div>
      <p className="text-content-primary mt-2 text-sm font-medium">
        Impression, Sunrise
      </p>
    </div>
  );
}

export default function AspectRatioDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <PlaybookDemoCard
      withoutLabel="No ratio"
      withLabel="Aspect ratio"
      belowControls={
        <ReplayButton
          label="Replay image load"
          onClick={() => setReplay((value) => value + 1)}
        />
      }
      contentClassName="flex w-full justify-center"
       without={
         <PaintingCard
           key="without-aspect-ratio"
           stable={false}
           replay={replay}
         />
       }
       with={
         <PaintingCard key="with-aspect-ratio" stable replay={replay} />
       }
    />
  );
}
