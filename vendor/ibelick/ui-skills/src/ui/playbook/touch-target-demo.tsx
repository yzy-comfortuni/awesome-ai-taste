import { PlaybookDemoCard } from "./demo-card";

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function TouchTargetIconButton({ showHitTarget }: { showHitTarget: boolean }) {
  if (!showHitTarget) {
    return (
      <button
        type="button"
        aria-label="Close"
        className="bg-fill-subtle text-content-primary hover:bg-fill-strong inline-flex size-6 items-center justify-center rounded-full transition-transform duration-150 active:scale-[0.96]"
      >
        <CloseIcon />
      </button>
    );
  }

  return (
    <div className="relative size-11">
      <div
        aria-hidden="true"
        className="border-content-muted pointer-events-none absolute inset-0 rounded-full border border-dashed"
      />
      <button
        type="button"
        aria-label="Close"
        className="group inline-flex size-11 items-center justify-center rounded-full"
      >
        <span className="bg-fill-subtle text-content-primary group-hover:bg-fill-strong flex size-6 items-center justify-center rounded-full transition-colors duration-150 ease-out group-active:scale-[0.96]">
          <CloseIcon />
        </span>
      </button>
    </div>
  );
}

export default function TouchTargetDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Default"
      withLabel="44px target"
      contentClassName="flex w-full justify-center"
      without={<TouchTargetIconButton showHitTarget={false} />}
      with={<TouchTargetIconButton showHitTarget />}
    />
  );
}
