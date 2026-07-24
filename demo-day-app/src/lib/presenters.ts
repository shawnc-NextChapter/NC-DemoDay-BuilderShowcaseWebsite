import type { Presenter } from "@/types/presenter";
import presentersData from "@/data/presenters.json";

/**
 * Get all presenters, sorted by displayOrder.
 * In production, this reads from the statically imported presenters.json.
 */
export function getAllPresenters(): Presenter[] {
  return (presentersData as Presenter[])
    .filter((p) => p.publishing.approved)
    .sort((a, b) => a.publishing.displayOrder - b.publishing.displayOrder);
}

/**
 * Get a single presenter by slug.
 */
export function getPresenterBySlug(slug: string): Presenter | undefined {
  return getAllPresenters().find((p) => p.slug === slug);
}

/**
 * Get all valid presenter slugs (for static generation).
 */
export function getAllPresenterSlugs(): string[] {
  return getAllPresenters().map((p) => p.slug);
}

/**
 * Generate a URL-safe slug from a name.
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
