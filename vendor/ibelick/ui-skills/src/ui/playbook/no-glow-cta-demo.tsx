import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function UpgradeCta({ solid = false }: { solid?: boolean }) {
  if (solid) {
    return (
      <Button variant="accent" shape="round">
        Upgrade plan
      </Button>
    );
  }

  return (
    <button
      type="button"
      className="rounded-full bg-content-accent px-5 py-2.5 text-sm font-medium text-content-inverse shadow-[0_0_28px_rgba(37,99,235,0.65)]"
    >
      Upgrade plan
    </button>
  );
}

export default function NoGlowCtaDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Glow"
      withLabel="Solid"
      contentClassName="flex w-full justify-center"
      without={<UpgradeCta />}
      with={<UpgradeCta solid />}
    />
  );
}
