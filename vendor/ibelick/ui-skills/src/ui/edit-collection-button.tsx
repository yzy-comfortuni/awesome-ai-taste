import { Dialog } from "@base-ui/react/dialog";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useId, useRef, useState } from "react";
import { updateCollection } from "../lib/library-client";
import { LIBRARY_LIMITS } from "../lib/library-types";

type EditCollectionButtonProps = {
  collectionId: string;
  title: string;
};

const controlClass =
  "type-body-md inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border px-3 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-content-primary disabled:opacity-60";

const fieldClass =
  "type-body-md text-content-primary placeholder:text-content-muted w-full rounded-lg bg-surface-default px-3 py-2 ring-1 ring-line-default outline-none focus:outline-none focus-visible:outline-none";

export function EditCollectionButton({
  collectionId,
  title,
}: EditCollectionButtonProps) {
  const titleId = useId();
  const errorId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(title);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const save = () => {
    const nextTitle = name.trim();
    if (!nextTitle || nextTitle === title) {
      setOpen(false);
      return;
    }
    setPending(true);
    setError(null);
    updateCollection(collectionId, { title: nextTitle })
      .then(() => {
        window.location.reload();
      })
      .catch((caught) => {
        setPending(false);
        setError(
          caught instanceof Error
            ? caught.message
            : "That collection could not be renamed.",
        );
      });
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (pending) return;
        setOpen(nextOpen);
        if (nextOpen) {
          setName(title);
          setError(null);
        }
      }}
      onOpenChangeComplete={(nextOpen) => {
        if (nextOpen || document.activeElement !== triggerRef.current) return;
        triggerRef.current?.blur();
      }}
    >
      <Dialog.Trigger
        ref={triggerRef}
        aria-label="Edit collection"
        className="text-content-secondary hover:bg-fill-strong hover:text-content-primary focus-visible:outline-content-primary inline-flex size-7 cursor-pointer items-center justify-center rounded-lg outline-none focus-visible:outline-1 focus-visible:outline-offset-2"
      >
        <PencilIcon className="size-4" aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-fill-inverse/35 fixed inset-0 z-50" />
        <Dialog.Popup
          finalFocus={false}
          className="border-line-default bg-surface-default fixed top-1/2 left-1/2 z-50 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 shadow-sm outline-none"
        >
          <Dialog.Title className="text-content-primary text-lg font-medium tracking-tight text-balance">
            Rename collection
          </Dialog.Title>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              save();
            }}
          >
            <label htmlFor={titleId} className="sr-only">
              Collection name
            </label>
            <input
              id={titleId}
              value={name}
              maxLength={LIBRARY_LIMITS.title}
              required
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={fieldClass}
              onChange={(event) => setName(event.target.value)}
            />
            {error ? (
              <p
                id={errorId}
                role="alert"
                className="type-body-md text-content-secondary text-pretty"
              >
                {error}
              </p>
            ) : null}
            <div className="flex items-center justify-end gap-2">
              <Dialog.Close
                className={`${controlClass} border-line-default bg-fill-default text-content-primary hover:bg-fill-subtle`}
                disabled={pending}
              >
                Cancel
              </Dialog.Close>
              <button
                type="submit"
                className={`${controlClass} border-transparent bg-fill-inverse text-content-inverse`}
                disabled={pending}
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
