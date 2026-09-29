import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function FocusButton({ withRing = false }: { withRing?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-content-secondary text-xs">Tab to focus</p>
      <Button
        shape="round"
        variant="outline"
        className={`outline-none ${
          withRing
            ? "focus-visible:ring-content-primary focus-visible:ring-2 focus-visible:ring-offset-2"
            : "focus-visible:outline-none"
        }`}
      >
        Continue
      </Button>
    </div>
  );
}

export default function FocusRingDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="No ring"
      withLabel="Visible"
      contentClassName="flex w-full justify-center"
      without={<FocusButton />}
      with={<FocusButton withRing />}
    />
  );
}
