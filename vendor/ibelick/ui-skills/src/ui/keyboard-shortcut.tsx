import { useEffect, useState } from "react";
import { CommandLineIcon } from "@heroicons/react/24/outline";

const shortcutClass =
  "inline-flex h-[18px] select-none items-center gap-0.5 bg-transparent font-mono text-[10px] text-content-inverse/60";

function CommandIcon() {
  return <CommandLineIcon className="size-2.5" aria-hidden="true" />;
}

export function CommandKShortcut() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  return (
    <kbd className={shortcutClass}>
      {isMac ? (
        <>
          <CommandIcon />K
        </>
      ) : (
        <>Ctrl K</>
      )}
    </kbd>
  );
}
