import { useEffect, useState } from "react";
import {
  getApplyUrl,
  getJob,
  JobsApiError,
  type PublicJob,
} from "../lib/jobs-api";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return "Recently posted";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function JobDetail({
  apiUrl,
  id,
}: {
  apiUrl: string;
  id: string;
}) {
  const [job, setJob] = useState<PublicJob | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getJob(apiUrl, id)
      .then(setJob)
      .catch((reason: unknown) => {
        setError(
          reason instanceof JobsApiError
            ? reason.message
            : "Unable to load this job.",
        );
      });
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="type-h2 text-content-primary">Job unavailable</h1>
        <p className="type-body-md text-content-secondary">{error}</p>
        <a
          href="/jobs"
          className="type-body-md text-content-primary font-medium underline underline-offset-4"
        >
          Back to jobs
        </a>
      </div>
    );
  }

  if (!job) {
    return <p className="type-body-md text-content-secondary">Loading job…</p>;
  }

  return (
    <article className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="type-body-md text-content-secondary">{job.companyName}</p>
        <h1 className="type-h1 text-content-primary text-balance">
          {job.title}
        </h1>
        <p className="type-body-md text-content-secondary">
          {job.location} · {job.employmentType} · Posted{" "}
          {formatDate(job.publishedAt)}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="type-body-md text-content-secondary font-[450]">
          About the role
        </h2>
        <p className="type-body-md text-content-primary text-pretty whitespace-pre-wrap">
          {job.description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={getApplyUrl(apiUrl, job.applicationUrl)}
          className="type-body-md bg-fill-inverse text-content-inverse inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium"
        >
          Apply for this job
        </a>
        <a
          href="/jobs"
          className="type-body-md text-content-secondary underline underline-offset-4"
        >
          All jobs
        </a>
      </div>
    </article>
  );
}
