// Content schemas: every file in src/content must match one of these.
// A missing or misspelled field makes the build fail, so errors show up before deploy.
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(), // 1-2 sentences, shown on the card
      role: z.string(),
      period: z.object({
        start: z.coerce.date(),
        end: z.coerce.date().optional(), // empty = ongoing
      }),
      type: z.enum(['professional', 'personal', 'open-source']),
      nda: z.boolean().default(false), // shows "Details anonymized" and hides client/links
      client: z.string().optional(),
      technologies: z.array(z.string()),
      tags: z.array(z.string()), // used by the filter on /projects
      cover: image().optional(),
      coverAlt: z.string().optional(),
      repoUrl: z.url().optional(),
      demoUrl: z.url().optional(),
      featured: z.boolean().default(false), // shown on the home page
      services: z.array(reference('services')).default([]),
      order: z.number().default(0), // higher = shown first
      draft: z.boolean().default(false),
    }),
});

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    company: z.string(),
    position: z.string(),
    location: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    highlights: z.array(z.string()),
    technologies: z.array(z.string()).default([]),
    relatedProjects: z.array(reference('projects')).default([]),
  }),
});

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    deliverables: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const profile = defineCollection({
  loader: file('./src/content/profile.yaml'),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    shortBio: z.string(),
    longBio: z.array(z.string()),
    location: z.string(),
    availableForFreelance: z.boolean(),
    vatNumber: z.string().optional(),
    focus: z.array(z.object({ label: z.string(), value: z.string() })),
    skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
    education: z.array(
      z.object({ degree: z.string(), school: z.string(), start: z.coerce.date(), end: z.coerce.date().optional() }),
    ),
    certifications: z.array(z.object({ name: z.string(), issuer: z.string(), year: z.number() })).default([]),
    languages: z.array(z.object({ name: z.string(), level: z.string() })),
    links: z.object({
      email: z.email(),
      github: z.url(),
      linkedin: z.url(),
      booking: z.url().optional(),
    }),
  }),
});

export const collections = { projects, experience, services, profile };
