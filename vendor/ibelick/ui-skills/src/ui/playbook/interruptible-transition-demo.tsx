import { useState } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const NAV = ["Home", "Projects", "Settings"];

function SidebarApp({ interruptible = false }: { interruptible?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <aside
        className={cn(
          "border-line-default absolute inset-y-0 left-0 z-10 flex w-32 flex-col justify-center border-r bg-surface-default px-4",
          interruptible
            ? cn(
                "transition-transform duration-300 ease-out",
                open ? "translate-x-0" : "-translate-x-full",
              )
            : open
              ? "animate-in slide-in-from-left fill-mode-forwards duration-300 ease-out"
              : "-translate-x-full",
        )}
        aria-hidden={!open}
      >
        <nav className="space-y-1" aria-label="Main">
          {NAV.map((item) => (
            <span key={item} className="text-content-secondary block text-sm">
              {item}
            </span>
          ))}
        </nav>
      </aside>

      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          type="button"
          variant="outline"
          shape="round"
          size="sm"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Open"}
        </Button>
      </div>
    </div>
  );
}

export default function InterruptibleTransitionDemo() {
  return (
    <PlaybookDemoCard
      flush
      withoutLabel="Keyframes"
      withLabel="Transition"
      without={<SidebarApp />}
      with={<SidebarApp interruptible />}
    />
  );
}
