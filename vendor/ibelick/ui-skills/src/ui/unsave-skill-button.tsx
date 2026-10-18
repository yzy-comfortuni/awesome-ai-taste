import { Popover } from "@base-ui/react/popover";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { removeSkillFromCollection, unsaveSkill } from "../lib/library-client";

type UnsaveSkillButtonProps = {
  skillPath: string;
  label: string;
  collectionId?: string;
};

const controlClass =
  "type-body-md inline-flex h-7 cursor-pointer items-center justify-center rounded-lg border px-2.5 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-content-primary disabled:opacity-60";

export function UnsaveSkillButton({
  skillPath,
  label,
  collectionId,
}: UnsaveSkillButtonProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = () => {
    setPending(true);
    setError(null);
    (collectionId
      ? removeSkillFromCollection(collectionId, skillPath)
      : unsaveSkill(skillPath))
      .then(() => {
        window.location.reload();
      })
      .catch((caught) => {
        setPending(false);
        setError(
          caught instanceof Error
            ? caught.message
            : "That skill could not be removed.",
        );
      });
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className="hover:bg-fill-strong focus-visible:outline-content-primary inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg outline-none focus-visible:outline-1 focus-visible:outline-offset-2 disabled:opacity-60"
        aria-label={label}
        disabled={pending}
      >
        <StarIcon className="size-4 text-yellow-500" aria-hidden="true" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          className="z-50"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <Popover.Popup className="bg-surface-default shadow-border w-60 rounded-xl p-3">
            <p className="type-body-md text-content-primary text-pretty">
              Are you sure you want to remove it?
            </p>
            {error ? (
              <p
                role="alert"
                className="type-body-md text-content-secondary mt-2 text-pretty"
              >
                {error}
              </p>
            ) : null}
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                className={`${controlClass} border-line-default bg-fill-default text-content-primary hover:bg-fill-subtle`}
                disabled={pending}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`${controlClass} border-transparent bg-fill-inverse text-content-inverse`}
                disabled={pending}
                onClick={remove}
              >
                Remove
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
