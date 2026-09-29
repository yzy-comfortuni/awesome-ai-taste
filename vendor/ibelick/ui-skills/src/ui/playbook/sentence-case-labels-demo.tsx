import { useId } from "react";
import { Input } from "../input";
import { PlaybookDemoCard } from "./demo-card";

function ProfileForm({ sentenceCase = false }: { sentenceCase?: boolean }) {
  const nameId = useId();
  const emailId = useId();

  const labelClass = sentenceCase
    ? "text-content-primary text-sm font-medium"
    : "text-content-primary text-xs font-semibold tracking-wide uppercase";

  return (
    <div className="w-56 space-y-4 text-left">
      <div>
        <label htmlFor={nameId} className={labelClass}>
          Full name
        </label>
        <Input id={nameId} defaultValue="Alex Morgan" className="mt-1.5" />
      </div>
      <div>
        <label htmlFor={emailId} className={labelClass}>
          Email address
        </label>
        <Input id={emailId} type="email" defaultValue="alex@example.com" className="mt-1.5" />
      </div>
    </div>
  );
}

export default function SentenceCaseLabelsDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="All caps"
      withLabel="Sentence case"
      contentClassName="flex w-full justify-center"
      without={<ProfileForm />}
      with={<ProfileForm sentenceCase />}
    />
  );
}
