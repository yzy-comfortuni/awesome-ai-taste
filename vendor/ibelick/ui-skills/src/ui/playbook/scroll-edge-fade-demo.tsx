import { cn } from "../../lib/cn";
import { PlaybookDemoCard } from "./demo-card";

const items = [
  "Inbox triage",
  "Design review",
  "API contract",
  "QA pass",
  "Launch notes",
  "Metrics follow-up",
  "Customer feedback",
  "Sprint retro",
  "Roadmap draft",
  "Billing review",
  "Team sync",
  "Archive",
];

function ScrollList({ faded = false }: { faded?: boolean }) {
  return (
    <div className="border-line-default w-full max-w-xs overflow-hidden rounded-lg border bg-surface-default">
      <div
        className={cn(
          "no-scrollbar h-52 overflow-y-auto py-1",
          faded && "scroll-fade scroll-fade-6",
        )}
      >
        {items.map((item) => (
          <p key={item} className="text-content-primary px-4 py-2 text-sm">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function ScrollEdgeFadeDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="No fade"
      withLabel="Scroll fade"
      contentClassName="flex w-full justify-center px-4"
      without={<ScrollList />}
      with={<ScrollList faded />}
    />
  );
}
