import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: "default" | "sm";
};

export function Input({
  size = "default",
  className,
  type = "text",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "text-content-primary placeholder:text-content-muted w-full bg-surface-default transition-shadow duration-150 ease-out outline-none",
        "ring-1 ring-line-default",
        "focus-visible:ring-content-primary focus-visible:ring-2 focus-visible:ring-offset-2",
        "aria-invalid:ring-red-500 aria-invalid:focus-visible:ring-red-500",
        size === "sm"
          ? "rounded-lg px-3.5 py-1.5 text-xs"
          : "rounded-lg px-3 py-2.5 text-sm",
        className,
      )}
      {...props}
    />
  );
}
