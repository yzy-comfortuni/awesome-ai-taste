import { useState } from "react";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

type CopyButtonProps = {
  content: string;
  className?: string;
  showText?: boolean;
  variant?: "ghost" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function fallbackCopy(content: string) {
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function CopyButton({
  content,
  className,
  showText = true,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    try {
      if (navigator.clipboard?.writeText) {
        await Promise.race([
          navigator.clipboard.writeText(content),
          new Promise((_, reject) =>
            window.setTimeout(() => reject(new Error("Clipboard timeout")), 500),
          ),
        ]);
      } else {
        fallbackCopy(content);
      }
    } catch {
      try {
        fallbackCopy(content);
      } catch {
        // Ignore clipboard errors.
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`type-body-md ${showText ? "h-7 px-2" : "size-7"} flex items-center justify-center gap-1 rounded-lg transition-[background-color,color] duration-150 ease-out ${variant === "secondary" ? "border border-line-default bg-fill-default text-content-primary hover:bg-fill-subtle" : "border border-transparent text-content-secondary hover:bg-fill-strong hover:text-content-primary"} ${className ?? ""}`}
      aria-label="Copy to clipboard"
      {...props}
    >
      {showText ? (
        <>
          {isCopied ? (
            <CheckIcon className="size-4" aria-hidden="true" />
          ) : (
            <DocumentDuplicateIcon className="size-4" aria-hidden="true" />
          )}
          <span className="font-medium">{isCopied ? "Copied" : "Copy"}</span>
        </>
      ) : isCopied ? (
          <CheckIcon className="size-4" aria-hidden="true" />
        ) : (
          <DocumentDuplicateIcon className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
