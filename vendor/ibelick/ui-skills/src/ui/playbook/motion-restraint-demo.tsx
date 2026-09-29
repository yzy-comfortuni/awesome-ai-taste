import { useState } from "react";
import { cn } from "../../lib/cn";
import { PlaybookDemoCard } from "./demo-card";

const TABS = [
  { id: "overview", label: "Overview", content: "3 open tasks" },
  { id: "files", label: "Files", content: "12 shared files" },
  { id: "team", label: "Team", content: "8 members" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function WorkbenchTabs({ restrained = false }: { restrained?: boolean }) {
  const [active, setActive] = useState<TabId>("overview");
  const activeTab = TABS.find((tab) => tab.id === active)!;

  return (
    <div className="w-56">
      <div
        className="border-line-default flex border-b"
        role="tablist"
        aria-label="Workbench"
      >
        {TABS.map((tab) => {
          const selected = active === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tab.id)}
              className={cn(
                "-mb-px flex-1 border-b-2 py-2 text-xs font-medium",
                selected
                  ? "text-content-primary border-content-primary"
                  : "text-content-secondary border-transparent",
                restrained && "transition-colors duration-100 ease-out",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="pt-4" role="tabpanel">
        {restrained ? (
          <p className="text-content-secondary text-sm">{activeTab.content}</p>
        ) : (
          <p
            key={active}
            className="text-content-secondary animate-in fade-in slide-in-from-bottom-2 blur-in fill-mode-both text-sm duration-300 ease-out"
          >
            {activeTab.content}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MotionRestraintDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Animated tabs"
      withLabel="Instant tabs"
      contentClassName="flex w-full justify-center"
      without={<WorkbenchTabs />}
      with={<WorkbenchTabs restrained />}
    />
  );
}
