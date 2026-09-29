import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function InboxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-content-extra-muted size-10"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.586a1 1 0 0 0-.707.293l-2.414 2.414a1 1 0 0 1-.707.293h-3.172a1 1 0 0 1-.707-.293l-2.414-2.414A1 1 0 0 0 6.586 13H4"
      />
    </svg>
  );
}

function EmptyInbox({ withAction = false }: { withAction?: boolean }) {
  return (
    <div className="flex w-56 flex-col items-center text-center">
      <InboxIcon />
      <p className="text-content-primary mt-3 text-sm font-medium">No messages yet</p>
      <p className="text-content-secondary mt-1 text-sm">
        When someone writes to you, it will show up here.
      </p>
      {withAction ? (
        <Button variant="primary" shape="round" className="mt-4">
          Compose message
        </Button>
      ) : null}
    </div>
  );
}

export default function EmptyStateCtaDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="No action"
      withLabel="One action"
      contentClassName="flex w-full justify-center"
      without={<EmptyInbox />}
      with={<EmptyInbox withAction />}
    />
  );
}
