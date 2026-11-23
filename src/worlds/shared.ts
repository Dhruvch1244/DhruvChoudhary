import { projects, type Project } from '../data/content';
import { caseStudies } from '../data/caseStudies';

const CASE_STUDY_SLUGS = new Set(caseStudies.map((c) => c.slug));

/** Where a project links: Kaabo's own page, a case study, or its repo. */
export function projectHref(p: Project): { to: string; internal: boolean } | null {
  if (p.slug === 'kaabo') return { to: '/kaabo', internal: true };
  if (CASE_STUDY_SLUGS.has(p.slug)) return { to: `/projects/${p.slug}`, internal: true };
  if (p.github) return { to: p.github, internal: false };
  return null;
}

/** The four the home page leads with, in every world. */
export const FEATURED_SLUGS = ['selecta', 'dsgn', 'lyric-viewer', 'kaabo'];

export function featuredProjects(): Project[] {
  return FEATURED_SLUGS.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => Boolean(p));
}

/** Every world except Constellation has its own Home/Projects layout. */
export function hasWorldPage(world: string) {
  return world !== 'constellation';
}

export { projects };
export type { Project };
