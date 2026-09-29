import { useState } from "react";
import { cn } from "../../lib/cn";
import { PlaybookDemoCard } from "./demo-card";

type TabId = "home" | "profile";
type IconVariant = "outline" | "filled";

function HomeIcon({ variant = "outline" }: { variant?: IconVariant }) {
  if (variant === "filled") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M12 3 3 10.2V20a1 1 0 0 0 1 1h5v-6h6v6h5a1 1 0 0 0 1-1v-9.8L12 3Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3 10.5 9-7 9 7M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"
      />
    </svg>
  );
}

function ProfileIcon({ variant = "outline" }: { variant?: IconVariant }) {
  if (variant === "filled") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-7 18a7 7 0 0 1 14 0v1H5v-1Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.75" />
      <path strokeLinecap="round" d="M5.5 20.25a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

const tabs = [
  { id: "home" as const, label: "Home", Icon: HomeIcon },
  { id: "profile" as const, label: "Profile", Icon: ProfileIcon },
];

function TabBar({
  activeTab,
  onActiveTabChange,
  outlineDefault = false,
}: {
  activeTab: TabId;
  onActiveTabChange: (tab: TabId) => void;
  outlineDefault?: boolean;
}) {
  return (
    <div className="flex w-52 items-center justify-around" role="tablist" aria-label="Demo tabs">
      {tabs.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        const variant = outlineDefault ? (active ? "filled" : "outline") : "filled";

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onActiveTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md px-3 py-1 transition-colors",
              active ? "text-content-primary" : "text-content-muted hover:text-content-secondary",
            )}
          >
            <Icon variant={variant} />
            <span className="text-[11px] font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function OutlineIconsDefaultDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <PlaybookDemoCard
      withoutLabel="All filled"
      withLabel="Outline default"
      contentClassName="flex w-full justify-center"
      without={<TabBar activeTab={activeTab} onActiveTabChange={setActiveTab} />}
      with={<TabBar activeTab={activeTab} onActiveTabChange={setActiveTab} outlineDefault />}
    />
  );
}
