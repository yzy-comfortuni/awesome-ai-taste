import { Dialog } from "@base-ui/react/dialog";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useId, useRef, useState } from "react";
import { createCollection } from "../lib/library-client";
import { LIBRARY_LIMITS } from "../lib/library-types";

const controlClass =
  "type-body-md inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border px-3 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-content-primary disabled:opacity-60";

const fieldClass =
  "type-body-md text-content-primary placeholder:text-content-muted w-full rounded-lg bg-surface-default px-3 py-2 ring-1 ring-line-default outline-none focus:outline-none focus-visible:outline-none";

export function CreateCollectionButton() {
  const titleId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const create = () => {
    const nextTitle = title.trim();
    if (!nextTitle) return;
    setPending(true);
    setError(null);
    createCollection({ title: nextTitle })
      .then((result) => {
        if (!result.collection) {
          throw new Error("That collection could not be created.");
        }
        window.location.assign(`/library/${result.collection.slug}`);
      })
      .catch((caught) => {
        setPending(false);
        setError(
          caught instanceof Error
            ? caught.message
            : "That collection could not be created.",
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
          setTitle("");
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
        className="type-body-md border-line-default bg-fill-default text-content-primary hover:bg-fill-subtle focus-visible:outline-content-primary inline-flex h-7 cursor-pointer items-center justify-center gap-1 rounded-lg border px-2 outline-none focus-visible:outline-1 focus-visible:outline-offset-2"
      >
        <PlusIcon className="size-3.5" aria-hidden="true" />
        New collection
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-fill-inverse/35 fixed inset-0 z-50" />
        <Dialog.Popup
          finalFocus={false}
          className="border-line-default bg-surface-default fixed top-1/2 left-1/2 z-50 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 shadow-sm outline-none"
        >
          <Dialog.Title className="text-content-primary text-lg font-medium tracking-tight text-balance">
            New collection
          </Dialog.Title>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              create();
            }}
          >
            <label
              htmlFor={titleId}
              className="type-body-md text-content-secondary"
            >
              Name
            </label>
            <input
              id={titleId}
              value={title}
              maxLength={LIBRARY_LIMITS.title}
              required
              autoComplete="off"
              placeholder="Collection name"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={fieldClass}
              onChange={(event) => setTitle(event.target.value)}
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
                Create
              </button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
