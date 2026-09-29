import { PlaybookDemoCard } from "./demo-card";

const FILENAME = "quarterly-brand-guidelines-final-v3.pdf";

function FileRow({ softFade = false }: { softFade?: boolean }) {
  return (
    <div className="w-48 rounded-lg bg-surface-default p-3 ring-1 ring-line-default">
      <p className="text-content-secondary text-xs">Attachment</p>
      <p
        className={
          softFade
            ? "text-content-primary mt-1 overflow-hidden text-sm whitespace-nowrap [mask-image:linear-gradient(to_right,black_80%,transparent)]"
            : "text-content-primary mt-1 truncate text-sm"
        }
      >
        {FILENAME}
      </p>
    </div>
  );
}

export default function SoftTruncateDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Ellipsis"
      withLabel="Soft fade"
      contentClassName="flex w-full justify-center"
      without={<FileRow />}
      with={<FileRow softFade />}
    />
  );
}
