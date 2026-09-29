import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

const compactButtonClass = "rounded-lg px-3.5 py-1.5 text-xs font-medium";

function ActionRow({ singleAccent = false }: { singleAccent?: boolean }) {
  if (singleAccent) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="accent" size="sm">
          Save
        </Button>
        <Button variant="outline" size="sm">
          Publish
        </Button>
        <Button variant="ghost" size="sm">
          Share
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button type="button" className={`${compactButtonClass} bg-content-accent text-content-inverse`}>
        Save
      </button>
      <button type="button" className={`${compactButtonClass} bg-emerald-600 text-content-inverse`}>
        Publish
      </button>
      <button type="button" className={`${compactButtonClass} bg-orange-500 text-content-inverse`}>
        Share
      </button>
    </div>
  );
}

export default function OneAccentDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Rainbow"
      withLabel="One accent"
      contentClassName="flex w-full justify-center"
      without={<ActionRow />}
      with={<ActionRow singleAccent />}
    />
  );
}
