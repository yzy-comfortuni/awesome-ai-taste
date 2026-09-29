import { cn } from "../../lib/cn";
import { PlaybookDemoCard } from "./demo-card";

const topics = [
  { name: "Visual", count: "12 notes" },
  { name: "Motion", count: "8 notes" },
  { name: "Systems", count: "16 notes" },
  { name: "Interaction", count: "9 notes" },
];

function Phone({ peek = false }: { peek?: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center">
      <div className="border-line-default flex h-56 w-[18.5rem] flex-col overflow-hidden rounded-t-[2rem] border border-b-0 bg-surface-default">
        <div className="mt-auto pb-5">
          <div
            className="scrollbar-none overflow-x-auto"
            aria-label="Scrollable topics"
            role="region"
          >
            <div className={cn("flex w-max gap-2 px-5", peek && "pr-5")}>
              {topics.map((topic) => (
                <article
                  key={topic.name}
                  className={cn(
                    "border-line-default flex shrink-0 flex-col justify-between rounded-xl border bg-surface-default p-3",
                    peek ? "w-40" : "w-64",
                  )}
                >
                  <p className="text-content-primary text-sm font-medium">
                    {topic.name}
                  </p>
                  <p className="text-content-secondary mt-8 text-xs">
                    {topic.count}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScrollPeekDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Flush"
      withLabel="Peek"
      contentClassName="absolute inset-0"
      flush
      without={<Phone />}
      with={<Phone peek />}
    />
  );
}
