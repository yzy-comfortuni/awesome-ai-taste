import { useEffect, useState } from "react";
import {
  getApplyUrl,
  getJobs,
  JobsApiError,
  type PublicJob,
  type JobsResponse,
} from "../lib/jobs-api";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return "Recently posted";
  return `Posted ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date)}`;
}

function logoUrl(companyWebsite: string | null) {
  if (!companyWebsite) return null;
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(companyWebsite).hostname}&sz=128`;
  } catch {
    return null;
  }
}

function JobRow({ apiUrl, job }: { apiUrl: string; job: PublicJob }) {
  const logo = logoUrl(job.companyWebsite);

  return (
    <a
      href={getApplyUrl(apiUrl, job.applicationUrl)}
      target="_blank"
      rel="noreferrer"
      className="group border-line-default flex items-center gap-3 border-b pt-3 pb-4"
    >
      {logo ? (
        <img
          src={logo}
          alt={`${job.companyName} logo`}
          width="40"
          height="40"
          loading="lazy"
          className="border-line-default size-10 shrink-0 rounded-xl border object-contain"
        />
      ) : (
        <div
          aria-hidden="true"
          className="bg-fill-subtle border-line-default size-10 shrink-0 rounded-xl border"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="type-body-md text-content-primary truncate font-[450]">
          {job.title}
        </div>
        <div className="type-body-md text-content-secondary truncate">
          {job.companyName} · {job.location} · {job.employmentType} ·{" "}
          {formatDate(job.publishedAt)}
        </div>
      </div>
    </a>
  );
}

type JobsListProps = {
  apiUrl: string;
  initialResponse: JobsResponse | null;
  initialError: string | null;
};

export default function JobsList({
  apiUrl,
  initialResponse,
  initialError,
}: JobsListProps) {
  const [jobs, setJobs] = useState<PublicJob[]>(initialResponse?.jobs ?? []);
  const [hasMore, setHasMore] = useState(initialResponse?.hasMore ?? false);
  const [offset, setOffset] = useState(
    initialResponse ? initialResponse.offset + initialResponse.jobs.length : 0,
  );
  const [loading, setLoading] = useState(!initialResponse && !initialError);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    if (initialResponse || initialError) return;

    getJobs(apiUrl)
      .then((response) => {
        setJobs(response.jobs);
        setHasMore(response.hasMore);
        setOffset(response.offset + response.jobs.length);
      })
      .catch((reason: unknown) => {
        setError(
          reason instanceof JobsApiError
            ? reason.message
            : "Unable to load jobs.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function loadMore() {
    setLoadingMore(true);
    setError(null);
    try {
      const response = await getJobs(apiUrl, 50, offset);
      setJobs((current) => [...current, ...response.jobs]);
      setHasMore(response.hasMore);
      setOffset(response.offset + response.jobs.length);
    } catch (reason) {
      setError(
        reason instanceof JobsApiError
          ? reason.message
          : "Unable to load more jobs.",
      );
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) {
    return (
      <div className="type-body-md text-content-secondary">Loading jobs…</div>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <p className="type-body-md text-content-secondary">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="type-body-md text-content-primary self-start font-medium underline underline-offset-4"
        >
          Try again
        </button>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <p className="type-body-md text-content-secondary">
        No jobs are available right now.
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {jobs.map((job) => (
        <JobRow key={job.id} apiUrl={apiUrl} job={job} />
      ))}
      {error ? (
        <p className="type-body-sm text-content-secondary mt-3">{error}</p>
      ) : null}
      {hasMore ? (
        <button
          type="button"
          onClick={loadMore}
          disabled={loadingMore}
          className="type-body-md bg-fill-subtle text-content-primary ring-line-default mt-5 self-start rounded-lg px-3 py-2 ring-1 disabled:cursor-wait disabled:opacity-60"
        >
          {loadingMore ? "Loading…" : "Load more jobs"}
        </button>
      ) : null}
    </div>
  );
}
