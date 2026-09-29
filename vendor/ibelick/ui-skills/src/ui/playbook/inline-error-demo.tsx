import { useId } from "react";
import { Input } from "../input";
import { PlaybookDemoCard } from "./demo-card";

function SignInForm({ inlineError = false }: { inlineError?: boolean }) {
  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();

  return (
    <div className="w-56 text-left">
      <div>
        <label htmlFor={emailId} className="text-content-primary text-sm font-medium">
          Email
        </label>
        <Input
          id={emailId}
          type="email"
          defaultValue="hello@"
          aria-invalid={inlineError}
          aria-describedby={inlineError ? errorId : undefined}
          className="mt-1.5"
        />
        {inlineError ? (
          <p id={errorId} className="text-red-600 mt-1.5 text-xs">
            Enter a valid email address
          </p>
        ) : null}
      </div>

      <div className="mt-4">
        <label htmlFor={passwordId} className="text-content-primary text-sm font-medium">
          Password
        </label>
        <Input
          id={passwordId}
          type="password"
          defaultValue="password"
          className="mt-1.5"
        />
      </div>

      {!inlineError ? (
        <p className="text-red-600 mt-6 text-xs">Enter a valid email address</p>
      ) : null}
    </div>
  );
}

export default function InlineErrorDemo() {
  return (
    <PlaybookDemoCard
      withoutLabel="Far away"
      withLabel="Inline"
      contentClassName="flex w-full justify-center"
      without={<SignInForm />}
      with={<SignInForm inlineError />}
    />
  );
}
