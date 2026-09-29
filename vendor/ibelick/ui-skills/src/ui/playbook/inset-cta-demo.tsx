import { Button } from "../button";
import { PlaybookDemoCard } from "./demo-card";

function MobileSheet({ inset = false }: { inset?: boolean }) {
  return (
    <div className="w-56 overflow-hidden rounded-xl bg-surface-default shadow-sm ring-1 ring-line-default">
      <div className="text-content-secondary space-y-1 px-4 py-4 text-sm">
        <p className="text-content-primary font-medium">Upgrade to Pro</p>
        <p>Unlock exports and shared libraries.</p>
      </div>
      {inset ? (
        <div className="px-4 pb-4">
          <Button variant="primary" shape="round" className="w-full">
            Start free trial
          </Button>
        </div>
      ) : (
        <Button variant="primary" shape="round" className="w-full rounded-none">
          Start free trial
        </Button>
      )}
    </div>
  );
}

export default function InsetCtaDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Edge to edge"
      withLabel="Inside margins"
      contentClassName="flex w-full justify-center"
      without={<MobileSheet />}
      with={<MobileSheet inset />}
    />
  );
}
