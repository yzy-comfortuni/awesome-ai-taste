import { PlaybookDemoCard } from "./demo-card";

function TextWrapDemo({ balanced = false }: { balanced?: boolean }) {
  return (
    <div className="w-80 text-left">
      <h2
        className={`text-content-primary text-3xl font-medium leading-tight tracking-tight ${balanced ? "text-balance" : ""}`}
      >
        Make every headline feel intentional
      </h2>
      <p
        className={`text-content-secondary mt-4 text-base leading-relaxed ${balanced ? "text-pretty" : ""}`}
      >
        Body copy should wrap cleanly without leaving a single word stranded
        on the last line.
      </p>
    </div>
  );
}

export default function TextBalanceDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Default"
      withLabel="Balanced"
      contentClassName="flex w-full justify-center"
      without={<TextWrapDemo />}
      with={<TextWrapDemo balanced />}
    />
  );
}
