import { useState } from "react";
import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function DeleteProject({ confirm = false }: { confirm?: boolean }) {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  if (deleted) {
    return <p className="text-content-secondary text-sm">Project deleted.</p>;
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        shape="round"
        className="text-red-600 ring-red-200 hover:bg-red-50"
        onClick={() => {
          if (confirm) {
            setOpen(true);
            return;
          }
          setDeleted(true);
        }}
      >
        Delete project
      </Button>

      {confirm && open ? (
        <div className="absolute top-full left-1/2 z-10 mt-3 w-56 -translate-x-1/2 rounded-xl bg-surface-default p-4 shadow-lg ring-1 ring-line-default">
          <p className="text-content-primary text-sm font-medium">
            Delete this project?
          </p>
          <p className="text-content-secondary mt-1 text-sm">
            This action cannot be undone.
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              shape="round"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              shape="round"
              size="sm"
              className="bg-red-600 text-content-inverse hover:bg-red-700"
              onClick={() => {
                setOpen(false);
                setDeleted(true);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function DestructiveDialogDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Immediate"
      withLabel="Confirm first"
      contentClassName="flex w-full justify-center"
      without={<DeleteProject />}
      with={<DeleteProject confirm />}
    />
  );
}
