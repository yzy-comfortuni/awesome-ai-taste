import { PlaybookDemoCard } from "./demo-card";

function DisplayHeading({ tuned = false }: { tuned?: boolean }) {
  return (
    <h2
      className={`text-content-primary text-3xl font-medium leading-tight ${
        tuned ? "tracking-tight" : "tracking-wide"
      }`}
    >
      Better interfaces
    </h2>
  );
}

export default function TrackingBySizeDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Too wide"
      withLabel="Tuned"
      contentClassName="flex w-full justify-center"
      without={<DisplayHeading />}
      with={<DisplayHeading tuned />}
    />
  );
}
