import githubMetadata from "../data/github-metadata.json";
import {
  designSystemCollections,
  type DesignSystem,
} from "../data/design-systems";
import IconLibraryActions from "./icon-library-actions";
import { TooltipProvider } from "./tooltip";

type GithubMetadata = {
  repositories: Record<string, { stars: number }>;
};

type Props = {
  systems: DesignSystem[];
  showCollectionHeaders?: boolean;
};

const repositoryMetadata = githubMetadata as GithubMetadata;

const getWebsiteHost = (websiteUrl: string) => {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./, "");
  } catch {
    return "design-system";
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

export default function DesignSystemDirectory({
  systems,
  showCollectionHeaders = true,
}: Props) {
  if (!showCollectionHeaders) {
    return (
      <TooltipProvider>
        <div>
          {systems.map((system) => (
            <SystemRow key={system.name} system={system} headingLevel="h2" />
          ))}
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-10">
        {designSystemCollections.map((collection) => {
          const collectionSystems = systems.filter(
            (system) => system.collection === collection.slug,
          );

          if (collectionSystems.length === 0) return null;

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
                {collectionSystems.map((system) => (
                  <SystemRow
                    key={system.name}
                    system={system}
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

function SystemRow({
  system,
  headingLevel,
}: {
  system: DesignSystem;
  headingLevel: "h2" | "h3";
}) {
  const repository = system.githubRepo
    ? repositoryMetadata.repositories[system.githubRepo.toLowerCase()]
    : undefined;
  const displayStars = formatStars(repository?.stars);
  const host = getWebsiteHost(system.websiteUrl);
  const githubOwner = system.githubRepo?.split("/")[0];
  const avatarUrl = githubOwner
    ? `https://github.com/${githubOwner}.png?size=80`
    : (system.faviconUrl ??
      `https://www.google.com/s2/favicons?domain=${host}&sz=64`);
  const avatarHref = system.githubRepo
    ? `https://github.com/${system.githubRepo}`
    : system.websiteUrl;
  const avatarLabel = system.githubRepo
    ? `Open ${system.name} on GitHub`
    : `Open ${system.name} website`;
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
              href={system.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {system.name}
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
          {system.description}
        </p>
      </div>

      <IconLibraryActions
        name={system.name}
        websiteUrl={system.websiteUrl}
        githubUrl={
          system.githubRepo
            ? `https://github.com/${system.githubRepo}`
            : undefined
        }
      />
    </article>
  );
}
