import { PlaybookDemoCard } from "./demo-card";

const linkClass = "text-sm text-content-accent hover:underline";

function SettingsCard({ linksOnly = false }: { linksOnly?: boolean }) {
  const titleClass = linksOnly
    ? "text-content-primary text-sm font-medium"
    : "text-sm font-medium text-content-accent";

  return (
    <div className="w-56 overflow-hidden rounded-lg bg-surface-default text-left ring-1 ring-line-default">
      <div className="px-4 py-3">
        <p className={titleClass}>Billing</p>
        <p className="text-content-secondary mt-1 text-sm">Invoice #1042 · $49.00 due Apr 12</p>
        <a href="#" className={`${linkClass} mt-2 inline-block`} onClick={(event) => event.preventDefault()}>
          View invoice
        </a>
      </div>

      <div className="border-line-default border-t px-4 py-3">
        <p className={titleClass}>Payment method</p>
        <p className="text-content-secondary mt-1 text-sm">Visa ending in 4242</p>
        <a href="#" className={`${linkClass} mt-2 inline-block`} onClick={(event) => event.preventDefault()}>
          Update card
        </a>
      </div>
    </div>
  );
}

export default function ColorMeansLinkDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Accent labels"
      withLabel="Links only"
      contentClassName="flex w-full justify-center"
      without={<SettingsCard />}
      with={<SettingsCard linksOnly />}
    />
  );
}
