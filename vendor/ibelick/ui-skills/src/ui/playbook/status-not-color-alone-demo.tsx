import { PlaybookDemoCard } from "./demo-card";

type StatusRowProps = {
  labeled?: boolean;
  status: "paid" | "failed";
};

function StatusDot({ status }: { status: "paid" | "failed" }) {
  return (
    <span
      className={`size-2 shrink-0 rounded-full ${status === "paid" ? "bg-emerald-500" : "bg-red-500"}`}
      aria-hidden="true"
    />
  );
}

function StatusRow({ labeled = false, status }: StatusRowProps) {
  const label = status === "paid" ? "Paid" : "Failed";

  return (
    <div className="flex w-56 items-center justify-between rounded-lg bg-surface-default px-4 py-3 ring-1 ring-line-default">
      <div>
        <p className="text-content-primary text-sm font-medium">Invoice #1042</p>
        <p className="text-content-secondary text-sm">$248.00</p>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status={status} />
        {labeled ? <span className="text-content-primary text-sm">{label}</span> : null}
      </div>
    </div>
  );
}

function StatusList({ labeled = false }: { labeled?: boolean }) {
  return (
    <div className="space-y-3">
      <StatusRow labeled={labeled} status="paid" />
      <StatusRow labeled={labeled} status="failed" />
    </div>
  );
}

export default function StatusNotColorAloneDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Color only"
      withLabel="Color + label"
      contentClassName="flex w-full justify-center"
      without={<StatusList />}
      with={<StatusList labeled />}
    />
  );
}
