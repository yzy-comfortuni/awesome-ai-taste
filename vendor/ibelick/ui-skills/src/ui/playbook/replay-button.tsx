import { useId, useState } from "react";
import { Button } from "../button";

function ReplayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export function ReplayButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const tooltipId = useId();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        shape="round"
        icon
        aria-label={label}
        aria-describedby={showTooltip ? tooltipId : undefined}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        <ReplayIcon />
      </Button>
      {showTooltip ? (
        <span
          id={tooltipId}
          role="tooltip"
          className="bg-fill-inverse pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-md px-2 py-1 text-xs whitespace-nowrap text-content-inverse"
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
