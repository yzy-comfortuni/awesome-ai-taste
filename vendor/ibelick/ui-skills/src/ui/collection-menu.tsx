import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { Menu } from "./menu";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useId, useState } from "react";
import { deleteCollection, updateCollection } from "../lib/library-client";
import { LIBRARY_LIMITS } from "../lib/library-types";

type CollectionMenuProps = {
  collectionId: string;
  title: string;
};

const controlClass =
  "type-body-md inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border px-3 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-content-primary disabled:opacity-60";

const fieldClass =
  "type-body-md text-content-primary placeholder:text-content-muted w-full rounded-lg bg-surface-default px-3 py-2 ring-1 ring-line-default outline-none focus:outline-none focus-visible:outline-none";

export function CollectionMenu({ collectionId, title }: CollectionMenuProps) {
  const titleId = useId();
  const errorId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(title);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const rename = () => {
    const nextTitle = name.trim();
    if (!nextTitle || nextTitle === title) {
      setRenameOpen(false);
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
    <>
      <Menu.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Menu.Trigger
          className="text-content-muted hover:bg-fill-strong hover:text-content-primary data-popup-open:bg-fill-strong data-popup-open:text-content-primary inline-flex size-6 cursor-pointer items-center justify-center rounded-md outline-none"
          aria-label={`Actions for ${title}`}
        >
          <EllipsisHorizontalIcon className="size-4" aria-hidden="true" />
        </Menu.Trigger>
        <Menu.Popup className="w-36 rounded-lg p-1" sideOffset={4}>
          <Menu.Item
            onClick={() => {
              setName(title);
              setError(null);
              setRenameOpen(true);
            }}
          >
            Rename
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setError(null);
              setDeleteOpen(true);
            }}
          >
            Delete
          </Menu.Item>
        </Menu.Popup>
      </Menu.Root>

      <Dialog.Root
        open={renameOpen}
        onOpenChange={(open) => {
          if (!pending) setRenameOpen(open);
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop className="bg-fill-inverse/35 fixed inset-0 z-50" />
          <Dialog.Popup className="border-line-default bg-surface-default fixed top-1/2 left-1/2 z-50 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 shadow-sm outline-none">
            <Dialog.Title className="text-content-primary text-lg font-medium tracking-tight text-balance">
              Rename collection
            </Dialog.Title>
            <form
              className="mt-4 flex flex-col gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                rename();
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

      <AlertDialog.Root
        open={deleteOpen}
        onOpenChange={(open) => {
          if (!pending) setDeleteOpen(open);
        }}
      >
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="bg-fill-inverse/35 fixed inset-0 z-50" />
          <AlertDialog.Popup className="border-line-default bg-surface-default fixed top-1/2 left-1/2 z-50 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 shadow-sm outline-none">
            <AlertDialog.Title className="text-content-primary text-lg font-medium tracking-tight text-balance">
              Delete this collection?
            </AlertDialog.Title>
            <AlertDialog.Description className="type-body-md text-content-secondary mt-2 text-pretty">
              {title} will be removed. Skills you saved stay in your library.
            </AlertDialog.Description>
            {error && deleteOpen ? (
              <p
                role="alert"
                className="type-body-md text-content-secondary mt-3 text-pretty"
              >
                {error}
              </p>
            ) : null}
            <div className="mt-5 flex items-center justify-end gap-2">
              <AlertDialog.Close
                className={`${controlClass} border-line-default bg-fill-default text-content-primary hover:bg-fill-subtle`}
                disabled={pending}
              >
                Cancel
              </AlertDialog.Close>
              <button
                type="button"
                className={`${controlClass} border-transparent bg-fill-inverse text-content-inverse`}
                disabled={pending}
                onClick={() => {
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
                Delete
              </button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
