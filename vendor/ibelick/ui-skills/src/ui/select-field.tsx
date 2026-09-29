import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Select } from "@base-ui/react/select";
import { useEffect, useRef, useState } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  onValueChange: (value: string) => void;
};

export function SelectField({
  id,
  name,
  label,
  value,
  options,
  placeholder = "Select an option",
  error,
  onValueChange,
}: SelectFieldProps) {
  const errorId = `${id}-error`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>();

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const updateWidth = () =>
      setTriggerWidth(trigger.getBoundingClientRect().width);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex flex-col gap-1">
      <Select.Root
        id={id}
        name={name}
        value={value || null}
        required
        items={options}
        onValueChange={(nextValue) => {
          if (typeof nextValue === "string") onValueChange(nextValue);
        }}
      >
        <Select.Label className="type-body-sm text-content-secondary font-[450]">
          {label}
        </Select.Label>
        <Select.Trigger
          ref={triggerRef}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`type-body-md bg-surface-default text-content-primary data-placeholder:text-content-muted inline-flex h-11 w-full items-center justify-between rounded-md border px-2 text-left outline-none focus:border-[#A5A5A5]/40 data-popup-open:border-[#A5A5A5]/40 focus:outline-none focus-visible:outline-none focus-visible:ring-0 sm:h-8 ${error ? "border-content-primary" : "border-line-default"}`}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronDownIcon
              className="text-content-primary size-4"
              aria-hidden="true"
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Positioner
            className="z-30"
            align="start"
            alignItemWithTrigger={false}
            side="bottom"
            style={{ width: triggerWidth }}
            sideOffset={4}
          >
            <Select.Popup className="border-line-default bg-surface-default w-full rounded-md border p-1 shadow-2xs outline-none">
              <Select.List>
                {options.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="type-body-sm text-content-secondary data-highlighted:bg-fill-strong data-selected:text-content-primary relative flex h-10 w-full items-center rounded-xs px-1.5 pl-7 text-left outline-none focus:outline-none focus-visible:outline-none sm:h-7"
                  >
                    <Select.ItemIndicator className="text-content-primary absolute left-1.5 inline-flex items-center">
                      <CheckIcon className="size-3.5" aria-hidden="true" />
                    </Select.ItemIndicator>
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      {error ? (
        <span id={errorId} className="type-body-sm text-content-primary">
          {error}
        </span>
      ) : null}
    </div>
  );
}
