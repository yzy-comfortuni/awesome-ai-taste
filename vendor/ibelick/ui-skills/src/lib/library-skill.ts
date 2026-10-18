import { getSkillByPath } from "./skill-catalog";
import { LibraryError } from "./library-types";

/** Catalog path slugs are the only skills a library can store. */
export function parseSkillPath(value: unknown) {
  if (typeof value !== "string" || value.length > 200 || !getSkillByPath(value)) {
    throw new LibraryError("Choose a skill from the directory.");
  }
  return value;
}
