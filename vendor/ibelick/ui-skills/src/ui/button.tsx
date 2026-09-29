import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  shape?: "default" | "round";
  size?: "default" | "sm";
  variant?: "primary" | "secondary" | "ghost" | "accent" | "outline";
  icon?: boolean;
};

const variantStyles = {
  primary: "bg-fill-inverse text-content-inverse hover:bg-fill-inverse",
  secondary: "bg-fill-subtle text-content-primary hover:bg-fill-strong ring-1 ring-line-default",
  ghost: "bg-transparent text-content-primary hover:bg-fill-subtle",
  accent: "bg-content-accent text-content-inverse hover:bg-content-accent",
  outline: "bg-surface-default text-content-primary ring-1 ring-line-default hover:bg-fill-subtle",
};

const sizeStyles = {
  sm: "gap-1 px-3.5 py-1.5 text-xs has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
  default:
    "gap-1.5 px-5 py-2.5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4",
};

export function Button({
  shape = "default",
  size = "default",
  variant = "primary",
  icon = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex select-none items-center justify-center font-medium transition-[background-color,transform] duration-150 ease-out",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        variantStyles[variant],
        icon
          ? cn("size-9 p-0", shape === "round" && "rounded-full", shape === "default" && "rounded-lg")
          : cn(shape === "round" ? "rounded-full" : "rounded-lg", sizeStyles[size]),
        className,
      )}
      {...props}
    />
  );
}
