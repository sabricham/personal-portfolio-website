// Small helpers shared by the pages.
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getProfile() {
  const entry = await getEntry('profile', 'main');
  if (!entry) throw new Error('Missing "main" entry in src/content/profile.yaml');
  return entry.data;
}

/** Published projects, highest `order` first, then most recent. */
export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort(
    (a, b) => b.data.order - a.data.order || b.data.period.start.valueOf() - a.data.period.start.valueOf(),
  );
}

export async function getExperience() {
  const all = await getCollection('experience');
  return all.sort((a, b) => b.data.start.valueOf() - a.data.start.valueOf());
}

export async function getServices() {
  const all = await getCollection('services');
  return all.sort((a, b) => b.data.order - a.data.order);
}

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatRange(start: Date, end?: Date) {
  return `${monthYear.format(start)} – ${end ? monthYear.format(end) : 'Present'}`;
}

export function formatYears(start: Date, end?: Date) {
  const s = start.getUTCFullYear();
  const e = end ? end.getUTCFullYear() : 'Present';
  return s === e ? `${s}` : `${s} – ${e}`;
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
