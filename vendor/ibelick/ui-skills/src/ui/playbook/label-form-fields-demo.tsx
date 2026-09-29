import { useId } from "react";
import { Input } from "../input";
import { PlaybookDemoCard } from "./demo-card";

function EmailField({ labeled = false }: { labeled?: boolean }) {
  const emailId = useId();

  if (labeled) {
    return (
      <div className="w-56 text-left">
        <label htmlFor={emailId} className="text-content-primary text-sm font-medium">
          Email address
        </label>
        <Input id={emailId} type="email" defaultValue="hello@example.com" className="mt-1.5" />
      </div>
    );
  }

  return (
    <div className="w-56 text-left">
      <Input type="email" placeholder="Email address" defaultValue="hello@example.com" />
    </div>
  );
}

export default function LabelFormFieldsDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Placeholder"
      withLabel="Label"
      contentClassName="flex w-full justify-center"
      without={<EmailField />}
      with={<EmailField labeled />}
    />
  );
}
