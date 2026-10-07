import githubMetadata from "../data/github-metadata.json";
import {
  componentCollections,
  type ComponentLibrary,
} from "../data/component-libraries";
import IconLibraryActions from "./icon-library-actions";
import { TooltipProvider } from "./tooltip";

type GithubMetadata = {
  repositories: Record<string, { stars: number }>;
};

type Props = {
  libraries: ComponentLibrary[];
  showCollectionHeaders?: boolean;
};

const repositoryMetadata = githubMetadata as GithubMetadata;

const getWebsiteHost = (websiteUrl: string) => {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./, "");
  } catch {
    return "component-library";
  }
};

const formatStars = (stars?: number) => {
  if (!stars) return null;
  if (stars < 1000) return `${Math.floor(stars / 100) * 100}+`;
  if (stars < 10000) {
    return `${(Math.floor(stars / 100) / 10).toFixed(1).replace(".0", "")}k+`;
  }
  return `${Math.floor(stars / 1000)}k+`;
};

export default function ComponentLibraryDirectory({
  libraries,
  showCollectionHeaders = true,
}: Props) {
  if (!showCollectionHeaders) {
    return (
      <TooltipProvider>
        <div>
          {libraries.map((library) => (
            <LibraryRow
              key={library.name}
              library={library}
              headingLevel="h2"
            />
          ))}
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-10">
        {componentCollections.map((collection) => {
          const collectionLibraries = libraries.filter(
            (library) => library.collection === collection.slug,
          );

          if (collectionLibraries.length === 0) return null;

          return (
            <section
              aria-labelledby={`${collection.slug}-title`}
              id={collection.slug}
              key={collection.slug}
            >
              <header className="mb-3 flex flex-col gap-1.5">
                <h2
                  className="type-body-lg text-content-primary font-[450] tracking-tight"
                  id={`${collection.slug}-title`}
                >
                  {collection.title}
                </h2>
                <p className="type-body-md text-content-secondary text-pretty">
                  {collection.description}
                </p>
              </header>
              <div>
                {collectionLibraries.map((library) => (
                  <LibraryRow
                    key={library.name}
                    library={library}
                    headingLevel="h3"
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

function LibraryRow({
  library,
  headingLevel,
}: {
  library: ComponentLibrary;
  headingLevel: "h2" | "h3";
}) {
  const repository = library.githubRepo
    ? repositoryMetadata.repositories[library.githubRepo.toLowerCase()]
    : undefined;
  const displayStars = formatStars(repository?.stars);
  const host = getWebsiteHost(library.websiteUrl);
  const githubOwner = library.githubRepo?.split("/")[0];
  const avatarUrl = githubOwner
    ? `https://github.com/${githubOwner}.png?size=80`
    : `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
  const avatarHref = library.githubRepo
    ? `https://github.com/${library.githubRepo}`
    : library.websiteUrl;
  const avatarLabel = library.githubRepo
    ? `Open ${library.name} on GitHub`
    : `Open ${library.name} website`;
  const Heading = headingLevel;

  return (
    <article className="border-line-default flex items-start gap-3 border-b py-4 sm:items-center">
      <a href={avatarHref} aria-label={avatarLabel} className="shrink-0">
        <img
          src={avatarUrl}
          alt=""
          aria-hidden="true"
          width="40"
          height="40"
          loading="lazy"
          decoding="async"
          className="border-line-default bg-fill-subtle size-10 rounded-xl border object-cover"
        />
      </a>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <Heading className="type-body-md text-content-primary truncate font-[450]">
            <a
              href={library.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {library.name}
            </a>
          </Heading>
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
        githubUrl={
          library.githubRepo
            ? `https://github.com/${library.githubRepo}`
            : undefined
        }
      />
    </article>
  );
}
