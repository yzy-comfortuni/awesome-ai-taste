export type PublicJob = {
  id: string;
  companyName: string;
  companyWebsite: string | null;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  applicationUrl: string;
  publishedAt: string;
  expiresAt: string;
};

export type JobsResponse = {
  jobs: PublicJob[];
  limit: number;
  offset: number;
  hasMore: boolean;
};

export type CreateJobInput = {
  // TODO(DB/API): add description to the private jobs database and make it
  // required once the legacy posting form collects it.
  description?: string;
  companyName: string;
  companyEmail: string;
  companyWebsite?: string;
  title: string;
  location: string;
  employmentType: string;
  applicationUrl: string;
  turnstileToken?: string;
};

export type CreateJobResponse = {
  jobId: string;
  checkoutUrl: string;
};

export type JobsApiErrorCode =
  | "invalid_job"
  | "invalid_idempotency_key"
  | "bot_check_failed"
  | "idempotency_key_reused"
  | "submission_unavailable"
  | "rate_limited"
  | "payment_unavailable"
  | "not_found"
  | "network_error";

export class JobsApiError extends Error {
  code: JobsApiErrorCode;
  status: number;
  fieldErrors: Record<string, string>;

  constructor(
    code: JobsApiErrorCode,
    status: number,
    message: string,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = "JobsApiError";
    this.code = code;
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export type JobsRuntimeEnv = {
  PUBLIC_JOBS_API_URL?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;
};

export function resolveJobsApiUrl(runtimeEnv?: JobsRuntimeEnv) {
  return (runtimeEnv?.PUBLIC_JOBS_API_URL ?? "").replace(/\/$/, "");
}

export function resolveTurnstileSiteKey(runtimeEnv?: JobsRuntimeEnv) {
  return runtimeEnv?.PUBLIC_TURNSTILE_SITE_KEY ?? "";
}

function getErrorMessage(code: JobsApiErrorCode) {
  switch (code) {
    case "bot_check_failed":
      return "The bot check expired or failed. Please try again.";
    case "rate_limited":
      return "Too many requests. Please try again later.";
    case "payment_unavailable":
      return "Payment is temporarily unavailable. Please try again later.";
    case "submission_unavailable":
      return "This submission can no longer be resumed.";
    case "idempotency_key_reused":
      return "This submission has already been processed. Please review the form and try again.";
    case "not_found":
      return "This job is unavailable or has expired.";
    case "network_error":
      return "The jobs service is temporarily unavailable. Please try again later.";
    default:
      return "Please check the form and try again.";
  }
}

function isJobsApiErrorCode(
  value: string | undefined,
): value is JobsApiErrorCode {
  return (
    value === "invalid_job" ||
    value === "invalid_idempotency_key" ||
    value === "bot_check_failed" ||
    value === "idempotency_key_reused" ||
    value === "submission_unavailable" ||
    value === "rate_limited" ||
    value === "payment_unavailable" ||
    value === "not_found" ||
    value === "network_error"
  );
}

async function request<T>(
  apiUrl: string,
  path: string,
  options?: RequestInit,
): Promise<T> {
  if (!apiUrl) {
    throw new JobsApiError(
      "network_error",
      0,
      "The jobs API is not configured.",
    );
  }

  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, options);
  } catch {
    throw new JobsApiError(
      "network_error",
      0,
      getErrorMessage("network_error"),
    );
  }

  if (response.ok) return response.json() as Promise<T>;

  let body: { error?: string; fieldErrors?: Record<string, string> } = {};
  try {
    body = await response.json();
  } catch {
    // Use the status mapping when the API does not return JSON.
  }

  const code = isJobsApiErrorCode(body.error)
    ? body.error
    : statusToErrorCode(response.status);
  throw new JobsApiError(
    code,
    response.status,
    getErrorMessage(code),
    body.fieldErrors,
  );
}

function statusToErrorCode(status: number): JobsApiErrorCode {
  if (status === 403) return "bot_check_failed";
  if (status === 404) return "not_found";
  if (status === 409) return "submission_unavailable";
  if (status === 429) return "rate_limited";
  if (status === 502) return "payment_unavailable";
  if (status === 400 || status === 422) return "invalid_job";
  return "network_error";
}

export function getJobs(apiUrl: string, limit = 50, offset = 0) {
  return request<JobsResponse>(
    apiUrl,
    `/jobs?limit=${limit}&offset=${offset}`,
    {
      headers: { Accept: "application/json" },
    },
  );
}

export function getJob(apiUrl: string, id: string) {
  return request<PublicJob>(apiUrl, `/jobs/${encodeURIComponent(id)}`, {
    headers: { Accept: "application/json" },
  });
}

export function createJob(
  apiUrl: string,
  input: CreateJobInput,
  idempotencyKey: string,
) {
  return request<CreateJobResponse>(apiUrl, "/jobs", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });
}

export function getApplyUrl(apiUrl: string, applicationUrl: string) {
  const url = new URL(applicationUrl, `${apiUrl}/`);
  url.searchParams.set("utm_source", "ui-skills.com");
  return url.toString();
}
