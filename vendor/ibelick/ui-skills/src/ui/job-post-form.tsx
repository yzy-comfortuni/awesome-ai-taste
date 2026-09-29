import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { createJob, JobsApiError } from "../lib/jobs-api";
import { SelectField } from "./select-field";

type FormValues = {
  companyName: string;
  logoUrl: string;
  contactEmail: string;
  website: string;
  roleTitle: string;
  employmentType: string;
  location: string;
  jobPostUrl: string;
};

const initialValues: FormValues = {
  companyName: "",
  logoUrl: "",
  contactEmail: "",
  website: "",
  roleTitle: "",
  employmentType: "",
  location: "",
  jobPostUrl: "",
};

const fieldLabels: Record<keyof FormValues, string> = {
  companyName: "Company name",
  logoUrl: "Logo URL",
  contactEmail: "Contact email",
  website: "Website",
  roleTitle: "Role title",
  employmentType: "Employment type",
  location: "Location",
  jobPostUrl: "Job post URL",
};

const fieldPlaceholders: Record<keyof FormValues, string> = {
  companyName: "UI Skills",
  logoUrl: "https://ui-skills.com/logo.png",
  contactEmail: "hello@ui-skills.com",
  website: "https://ui-skills.com",
  roleTitle: "Senior design engineer",
  employmentType: "Select employment type",
  location: "Remote, worldwide",
  jobPostUrl: "https://ui-skills.com/jobs",
};

function newIdempotencyKey() {
  return crypto.randomUUID();
}

type JobPostFormProps = {
  apiUrl: string;
  turnstileSiteKey: string;
};

export default function JobPostForm({
  apiUrl,
  turnstileSiteKey,
}: JobPostFormProps) {
  const turnstileEnabled = import.meta.env.PROD;
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [idempotencyKey, setIdempotencyKey] = useState(newIdempotencyKey);
  const [submitting, setSubmitting] = useState(false);
  const [contactCopied, setContactCopied] = useState(false);
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!turnstileEnabled) return;
    const siteKey = turnstileSiteKey;
    if (!siteKey || !turnstileContainer.current) return;

    const render = () => {
      if (!window.turnstile || !turnstileContainer.current || widgetId.current)
        return;
      widgetId.current = window.turnstile.render(turnstileContainer.current, {
        sitekey: siteKey,
        action: "jobs-submit",
        appearance: "interaction-only",
        callback: (token) => {
          setTurnstileToken(token);
          setFormError(null);
        },
        "expired-callback": () => setTurnstileToken(null),
        "error-callback": () => {
          setTurnstileToken(null);
          setFormError("The bot check could not load. Please try again.");
        },
      });
    };

    if (window.turnstile) {
      render();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/"]',
    );
    const handleLoad = () => render();
    const handleError = () =>
      setFormError("The bot check could not load. Please try again.");

    if (!script) {
      script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.append(script);
    }
    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    return () => {
      script?.removeEventListener("load", handleLoad);
      script?.removeEventListener("error", handleError);
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [turnstileEnabled]);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
    setFormError(null);
    setIdempotencyKey(newIdempotencyKey());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    if (turnstileEnabled && !turnstileToken) {
      setFormError("Complete the bot check before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO(DB/API): add `description` to the jobs schema and form. The
      // current legacy form does not collect it, although the API contract requires it.
      // TODO(DB/API): add `logoUrl` to the public job schema if company
      // logos should be stored separately from the company website.
      const response = await createJob(
        apiUrl,
        {
          companyName: values.companyName,
          companyEmail: values.contactEmail,
          companyWebsite: values.website,
          title: values.roleTitle,
          location: values.location,
          employmentType: values.employmentType,
          applicationUrl: values.jobPostUrl,
          ...(turnstileEnabled && turnstileToken ? { turnstileToken } : {}),
        },
        idempotencyKey,
      );
      window.location.assign(response.checkoutUrl);
    } catch (reason) {
      if (reason instanceof JobsApiError) {
        setFormError(reason.message);
        setFieldErrors(reason.fieldErrors);
        if (reason.code === "bot_check_failed") {
          setTurnstileToken(null);
          if (widgetId.current) window.turnstile?.reset(widgetId.current);
        }
        if (reason.code === "invalid_idempotency_key") {
          setIdempotencyKey(newIdempotencyKey());
        }
      } else {
        setFormError("Unable to submit the job. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function fieldError(name: keyof FormValues) {
    return fieldErrors[name] ? (
      <span id={`${name}-error`} className="type-body-sm text-content-primary">
        {fieldErrors[name]}
      </span>
    ) : null;
  }

  function inputClass(name: keyof FormValues) {
    return `type-body-md h-11 sm:h-8 rounded-md border bg-surface-default px-2 text-content-primary outline-none placeholder:text-content-muted focus:border-[#A5A5A5]/40 ${fieldErrors[name] ? "border-content-primary" : "border-line-default"}`;
  }

  async function copyContactEmail() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText("contact@interfaceoffice.com");
      setContactCopied(true);
      window.setTimeout(() => setContactCopied(false), 2000);
    } catch {
      setFormError("Unable to copy the contact email.");
    }
  }

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {(Object.keys(fieldLabels) as Array<keyof FormValues>).map((name) => {
          const label = fieldLabels[name];
          const isSelect = name === "employmentType";
          return (
            <label key={name} className="relative flex flex-col gap-1">
              {!isSelect ? (
                <span className="type-body-sm text-content-secondary font-[450]">
                  {label}
                </span>
              ) : null}
              {isSelect ? (
                <SelectField
                  id="employment-type"
                  name={name}
                  label={label}
                  value={values[name]}
                  options={[
                    { label: "Full-time", value: "Full-time" },
                    { label: "Part-time", value: "Part-time" },
                    { label: "Contract", value: "Contract" },
                    { label: "Internship", value: "Internship" },
                  ]}
                  placeholder={fieldPlaceholders[name]}
                  error={fieldErrors[name]}
                  onValueChange={(value) => {
                    setValues((current) => ({ ...current, [name]: value }));
                    setFieldErrors((current) => ({ ...current, [name]: "" }));
                    setFormError(null);
                    setIdempotencyKey(newIdempotencyKey());
                  }}
                />
              ) : (
                <input
                  name={name}
                  type={
                    name === "contactEmail"
                      ? "email"
                      : name.includes("Url") ||
                          name === "logoUrl" ||
                          name === "website"
                        ? "url"
                        : "text"
                  }
                  value={values[name]}
                  placeholder={fieldPlaceholders[name]}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  aria-invalid={Boolean(fieldErrors[name])}
                  aria-describedby={
                    fieldErrors[name] ? `${name}-error` : undefined
                  }
                  className={inputClass(name)}
                />
              )}
              {fieldError(name)}
            </label>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        {turnstileEnabled ? <div ref={turnstileContainer} /> : null}
        {turnstileEnabled && !turnstileSiteKey ? (
          <p className="type-body-sm text-content-secondary">
            Bot verification is not configured.
          </p>
        ) : null}
        {formError ? (
          <p role="alert" className="type-body-sm text-content-primary">
            {formError}
          </p>
        ) : null}
      </div>

      <div className="flex justify-between gap-2">
        <button
          type="button"
          onClick={copyContactEmail}
          aria-label="Copy contact email"
          className="type-body-md border-line-default bg-fill-default text-content-primary inline-flex h-8 items-center justify-center rounded-lg border px-3"
        >
          <EnvelopeIcon className="mr-1.5 size-4" aria-hidden="true" />
          {contactCopied ? "Email copied" : "Get in touch"}
        </button>
        <button
          type="submit"
          disabled={submitting || (turnstileEnabled && !turnstileToken)}
          className="type-body-md bg-fill-inverse text-content-inverse inline-flex h-8 items-center justify-center rounded-lg px-3 font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit and purchase"}
          <ArrowRightIcon className="ml-1.5 size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
