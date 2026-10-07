import type { IconLibrary } from "../data/icon-libraries";
import githubMetadata from "../data/github-metadata.json";
import IconLibraryActions from "./icon-library-actions";
import { TooltipProvider } from "./tooltip";

type GithubMetadata = {
  repositories: Record<string, { stars: number }>;
};

const repositoryMetadata = githubMetadata as GithubMetadata;

type Props = {
  libraries: IconLibrary[];
};

const formatStars = (stars?: number) => {
  if (!stars) return null;
  if (stars < 1000) return `${Math.floor(stars / 100) * 100}+`;
  if (stars < 10000)
    return `${(Math.floor(stars / 100) / 10).toFixed(1).replace(".0", "")}k+`;
  return `${Math.floor(stars / 1000)}k+`;
};

export default function IconLibraryDirectory({ libraries }: Props) {
  return (
    <TooltipProvider>
      <div>
        {libraries.map((library) => {
          const githubOwner = library.githubRepo.split("/")[0] ?? "github";
          const repository =
            repositoryMetadata.repositories[library.githubRepo.toLowerCase()];
          const displayStars = formatStars(repository?.stars);

          return (
            <article
              className="border-line-default flex items-start gap-3 border-b py-4 sm:items-center"
              key={library.name}
            >
              <img
                src={`https://github.com/${githubOwner}.png?size=80`}
                alt=""
                aria-hidden="true"
                width="40"
                height="40"
                loading="lazy"
                decoding="async"
                className="border-line-default bg-fill-subtle size-10 shrink-0 rounded-xl border object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <h2 className="type-body-md text-content-primary truncate font-[450]">
                    <a
                      href={library.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {library.name}
                    </a>
                  </h2>
                  {displayStars && (
                    <span
                      className="type-body-sm text-content-muted inline-flex items-center gap-1"
                      aria-label={`${displayStars} GitHub stars`}
                    >
                      <span aria-hidden="true" className="text-[11px]">
                        ★
                      </span>
                      {displayStars}
                    </span>
                  )}
                </div>
                <p className="type-body-md text-content-secondary truncate">
                  {library.description}
                </p>
              </div>

              <IconLibraryActions
                name={library.name}
                websiteUrl={library.websiteUrl}
                githubUrl={`https://github.com/${library.githubRepo}`}
              />
            </article>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
