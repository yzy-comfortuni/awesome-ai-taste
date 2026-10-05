import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "./tooltip";

type Props = {
  name: string;
  websiteUrl: string;
  githubUrl: string;
};

const actionClassName =
  "inline-flex size-8 items-center justify-center rounded-lg text-content-secondary transition-colors hover:bg-fill-subtle hover:text-content-primary focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-content-primary";

export default function IconLibraryActions({
  name,
  websiteUrl,
  githubUrl,
}: Props) {
  return (
    <div className="flex shrink-0 items-center gap-1 self-center">
      <Tooltip content={`Open ${name} website`} side="top">
        <a
          className={actionClassName}
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} website`}
        >
          <ArrowTopRightOnSquareIcon className="size-4" aria-hidden="true" />
        </a>
      </Tooltip>
      <Tooltip content={`Open ${name} on GitHub`} side="top">
        <a
          className={actionClassName}
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} on GitHub`}
        >
          <svg
            aria-hidden="true"
            className="size-4"
            viewBox="0 0 98 96"
            fill="currentColor"
          >
            <path d="M48.9 0C21.8 0 0 22.1 0 49.2c0 21.7 14 40.1 33.4 46.6 2.4.4 3.3-1 3.3-2.3v-8.2c-13.6 3-16.5-5.8-16.5-5.8-2.2-5.7-5.4-7.2-5.4-7.2-4.4-3 .3-3 .3-3 4.8.3 7.3 5 7.3 5 4.3 7.4 11.2 5.3 13.9 4 .4-3.1 1.7-5.3 3-6.5-10.9-1.2-22.4-5.5-22.4-24.3 0-5.4 1.9-9.8 5-13.3-.5-1.2-2.2-6.3.5-13.1 0 0 4.1-1.3 13.5 5.1 3.9-1.1 8.1-1.7 12.3-1.7 4.2 0 8.4.6 12.3 1.7 9.4-6.4 13.5-5.1 13.5-5.1 2.7 6.8 1 11.9.5 13.1 3.1 3.5 5 7.9 5 13.3 0 18.9-11.5 23.1-22.5 24.3 1.8 1.6 3.3 4.7 3.3 9.5v14.1c0 1.4.9 2.7 3.4 2.3C84 89.3 98 70.9 98 49.2 98 22.1 76 0 48.9 0Z" />
          </svg>
        </a>
      </Tooltip>
    </div>
  );
}
