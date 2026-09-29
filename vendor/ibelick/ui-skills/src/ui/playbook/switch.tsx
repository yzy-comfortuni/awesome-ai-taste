import { cn } from "../../lib/cn";

type PlaybookSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  className?: string;
  "aria-label"?: string;
};

export function PlaybookSwitch({
  checked,
  onCheckedChange,
  id = "playbook-tip-switch",
  className,
  "aria-label": ariaLabel = "Show tip",
}: PlaybookSwitchProps) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-pressed={checked}
      aria-label={ariaLabel}
      onPointerDown={(event) => {
        event.preventDefault();
        onCheckedChange(!checked);
      }}
      onClick={(event) => {
        if (event.detail === 0) {
          onCheckedChange(!checked);
        }
      }}
      style={{
        backgroundColor: checked
          ? "var(--color-fill-inverse)"
          : "var(--color-fill-strong)",
      }}
      className={cn(
        "focus-visible:outline-content-primary relative inline-flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "bg-surface-default size-5 rounded-full shadow-sm transition-transform",
          checked && "translate-x-4",
        )}
      />
    </button>
  );
}
