export const LIBRARY_LIMITS = {
  savedSkills: 200,
  collections: 30,
  skillsPerCollection: 40,
  title: 80,
} as const;

export type LibraryCollection = {
  id: string;
  slug: string;
  title: string;
  skillPaths: string[];
};

export type LibrarySnapshot = {
  savedSkillPaths: string[];
  collections: LibraryCollection[];
};

export class LibraryError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "LibraryError";
    this.status = status;
  }
}

export function isLibraryPath(pathname: string) {
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return (
    normalized === "/library" ||
    normalized.startsWith("/library/") ||
    normalized === "/api/library" ||
    normalized.startsWith("/api/library/")
  );
}

export function isCollectionSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 48;
}

export function collectionSlug(title: string) {
  return title
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
    .replace(/-+$/g, "");
}

export function suffixedCollectionSlug(base: string, suffixNumber: number) {
  if (suffixNumber <= 1) return base;
  const suffix = `-${suffixNumber}`;
  const stem = base.slice(0, 48 - suffix.length).replace(/-+$/g, "");
  return `${stem}${suffix}`;
}

export function parseCollectionTitle(value: unknown) {
  if (typeof value !== "string") {
    throw new LibraryError("Enter a collection title.");
  }
  const title = value.trim().replace(/\s+/g, " ");
  if (!title) throw new LibraryError("Enter a collection title.");
  if (title.length > LIBRARY_LIMITS.title) {
    throw new LibraryError("Use a title of 80 characters or fewer.");
  }
  if (!collectionSlug(title)) {
    throw new LibraryError("Use a title with letters or numbers.");
  }
  return title;
}
