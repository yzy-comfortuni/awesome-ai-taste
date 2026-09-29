import { PlaybookDemoCard } from "./demo-card";

const copy =
  "When every line stretches from edge to edge, reading feels like work. Your eye travels farther across each line, then jumps all the way back to start the next one. A shorter measure keeps the rhythm calm.";

function MeasureText({ capped = false }: { capped?: boolean }) {
  return (
    <div className="w-[75ch] max-w-full text-left">
      <p
        className={`text-content-primary text-base leading-relaxed ${capped ? "max-w-[60ch]" : "w-full"}`}
      >
        {copy}
      </p>
    </div>
  );
}

export default function LineMeasureDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Too wide"
      withLabel="60ch"
      contentClassName="absolute inset-x-8 inset-y-0 flex w-[calc(100%-4rem)] items-center"
      without={<MeasureText />}
      with={<MeasureText capped />}
    />
  );
}
