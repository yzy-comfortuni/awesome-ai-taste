import { PlaybookDemoCard } from "./demo-card";

function HeroHeading({ tight = false }: { tight?: boolean }) {
  return (
    <h2
      className={`text-content-primary max-w-[16ch] text-3xl font-medium tracking-tight ${
        tight ? "leading-tight" : "leading-normal"
      }`}
    >
      Design details that compound into better interfaces
    </h2>
  );
}

export default function HeadingLineHeightDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Loose"
      withLabel="Tight"
      contentClassName="flex w-full justify-center px-4"
      without={<HeroHeading />}
      with={<HeroHeading tight />}
    />
  );
}
