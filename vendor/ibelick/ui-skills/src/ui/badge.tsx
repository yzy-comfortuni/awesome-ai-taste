import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-content-primary inline-flex h-8 shrink-0 items-center rounded-lg border border-line-default bg-transparent px-2.5 text-sm font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
