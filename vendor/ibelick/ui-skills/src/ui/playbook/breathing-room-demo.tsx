import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function ActionPair({ spaced = false }: { spaced?: boolean }) {
  return (
    <div className={`flex ${spaced ? "gap-3" : "gap-1"}`}>
      <Button variant="outline" shape="round" size="sm">
        Edit
      </Button>
      <Button variant="outline" shape="round" size="sm">
        Share
      </Button>
    </div>
  );
}

export default function BreathingRoomDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Cramped"
      withLabel="Breathing room"
      contentClassName="flex w-full justify-center"
      without={<ActionPair />}
      with={<ActionPair spaced />}
    />
  );
}
