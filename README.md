# sabrichamtouri.com

Personal portfolio of Sabri Chamtouri, embedded software engineer. Static site built with
[Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), hosted on Cloudflare Pages.

## Commands

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm install`     | Install dependencies (once, or after a pull)   |
| `npm run dev`     | Local dev server at http://localhost:4321      |
| `npm run build`   | Production build into `dist/`                  |
| `npm run preview` | Serve the production build locally             |

## Editing content

All content lives in `src/content/`. The schemas in `src/content.config.ts` validate every file,
so a missing or wrong field makes the build fail with a clear message.

| What                    | Where                                  |
| ----------------------- | -------------------------------------- |
| Bio, skills, links      | `src/content/profile.yaml`             |
| Projects                | `src/content/projects/<slug>.mdx`      |
| Work experience         | `src/content/experience/<name>.md`     |
| Freelance services      | `src/content/services/<slug>.md`       |

- **New project:** copy an existing `.mdx` file, rename it (the file name becomes the URL) and edit it.
  Put a cover image next to it and reference it with `cover: ./my-cover.jpg`.
- **Hide a project:** set `draft: true`.
- **Show on the home page:** set `featured: true` (the first three are shown).
- **NDA:** set `nda: true` to show the "Details anonymized" badge and hide client and links.

## Deploy (Cloudflare Pages)

Workers & Pages → Create → Pages → Connect to Git → this repository, with:

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`

Every push to `main` is built and published automatically.
