import { AlertDialog } from "@base-ui/react/alert-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { deleteCollection } from "../lib/library-client";
import { cn } from "../lib/cn";

type DeleteCollectionButtonProps = {
  collectionId: string;
  title: string;
};

const controlClass =
  "type-body-md inline-flex h-8 cursor-pointer select-none items-center justify-center rounded-lg border px-3 font-normal transition-[background-color,color,border-color] duration-150 ease-out focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-content-primary disabled:opacity-60";

export function DeleteCollectionButton({
  collectionId,
  title,
}: DeleteCollectionButtonProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog.Root
      onOpenChangeComplete={(open) => {
        if (open || document.activeElement !== triggerRef.current) return;
        triggerRef.current?.blur();
      }}
    >
      <AlertDialog.Trigger
        ref={triggerRef}
        aria-label={`Delete ${title}`}
        className="text-content-secondary hover:bg-fill-strong hover:text-content-primary focus-visible:outline-content-primary inline-flex size-7 cursor-pointer items-center justify-center rounded-lg outline-none focus-visible:outline-1 focus-visible:outline-offset-2 disabled:opacity-60"
      >
        <TrashIcon className="size-4" aria-hidden="true" />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="bg-fill-inverse/35 fixed inset-0 z-50" />
        <AlertDialog.Popup
          finalFocus={false}
          className="border-line-default bg-surface-default fixed top-1/2 left-1/2 z-50 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 shadow-sm outline-none"
        >
          <AlertDialog.Title className="text-content-primary text-lg font-medium tracking-tight text-balance">
            Delete this collection?
          </AlertDialog.Title>
          <AlertDialog.Description className="type-body-md text-content-secondary mt-2 text-pretty">
            {title} will be removed. Skills you saved stay in your library.
          </AlertDialog.Description>
          {error ? (
            <p
              role="alert"
              className="type-body-md text-content-secondary mt-3 text-pretty"
            >
              {error}
            </p>
          ) : null}
          <div className="mt-5 flex items-center justify-end gap-2">
            <AlertDialog.Close
              className={cn(
                controlClass,
                "border-line-default bg-fill-default text-content-primary hover:bg-fill-subtle",
              )}
              disabled={pending}
            >
              Cancel
            </AlertDialog.Close>
            <button
              type="button"
              className={cn(
                controlClass,
                "border-transparent bg-fill-inverse text-content-inverse",
              )}
              disabled={pending}
              aria-busy={pending}
              onClick={() => {
                if (pending) return;
                setPending(true);
                setError(null);
                deleteCollection(collectionId)
                  .then(() => {
                    window.location.assign("/library");
                  })
                  .catch((caught) => {
                    setPending(false);
                    setError(
                      caught instanceof Error
                        ? caught.message
                        : "That collection could not be deleted.",
                    );
                  });
              }}
            >
              Delete collection
            </button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
