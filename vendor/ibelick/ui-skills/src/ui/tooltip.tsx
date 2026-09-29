import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  closeOnClick?: boolean;
};

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delay={0} closeDelay={0}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export function Tooltip({
  content,
  children,
  side = "bottom",
  closeOnClick = true,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger delay={0} closeOnClick={closeOnClick} render={children} />
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner className="z-50" side={side} sideOffset={6}>
          <TooltipPrimitive.Popup className="type-body-sm rounded-md border-0 bg-fill-inverse px-2 py-1 font-normal text-content-inverse shadow-none">
            {content}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
