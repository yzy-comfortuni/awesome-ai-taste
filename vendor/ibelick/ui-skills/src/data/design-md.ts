import designMdIndex from "./design-md-index.json";

export type DesignMdEntry = {
  id: string;
  name: string;
  sourceUrl: string;
  websiteUrl: string;
  updatedAt: string;
  description: string;
  previewImage?: string;
  logoImage: string;
};

export const designMd: DesignMdEntry[] = designMdIndex;

export const designMdBySlug = new Map(
  designMd.map((entry) => [entry.id, entry]),
);
