# Architettura

Descrive il progetto com'è **adesso**. Il "perché" delle scelte è in `decisions.md`.
Ultimo aggiornamento: 2026-10-27.

## 1. Visione d'insieme

Sito **statico**: Astro genera HTML/CSS/JS in fase di build, nessun server applicativo né database.
GitHub è l'unica fonte di verità; il sito online è il risultato compilato del branch `main`.

```
Contenuti (Markdown/YAML) ─┐
Componenti + stile (.astro) ─┼─► astro build ─► dist/ ─► Cloudflare Workers (static assets) ─► sabrichamtouri.com
                             │
git push (main) ─► GitHub ─► Workers Builds: npm run build + npx wrangler deploy
```

## 2. Infrastruttura

| Componente | Scelta | Costo | Stato |
| --- | --- | --- | --- |
| Dominio | `sabrichamtouri.com` su Cloudflare Registrar | ~10-15 €/anno | Acquistato |
| DNS | Cloudflare | 0 € | Attivo |
| Hosting + CDN + HTTPS | **Cloudflare Workers** con static assets (non Pages) | 0 € | Attivo |
| CI/CD | Workers Builds collegato a GitHub | 0 € | Attivo |
| Repository | GitHub `sabricham/personal-portfolio-website` | 0 € | Attivo |
| Email professionale | Cloudflare Email Routing (`hello@sabrichamtouri.com` → casella personale) | 0 € | Da configurare |
| Analytics | Cloudflare Web Analytics (senza cookie) | 0 € | Da configurare |

### Configurazione Cloudflare Workers (dashboard)

- Nome progetto/Worker: `sabrichamtouri-com` (**deve** coincidere con `name` in `wrangler.jsonc`)
- Production branch: `main`; path: `/`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command (branch non-production): `npx wrangler versions upload`; preview builds attive
- Cloudflare Access: disattivato; nessuna variabile d'ambiente
- Custom domain: Settings → Domains & Routes → Custom domain

### File di deploy nel repository

- `wrangler.jsonc`: `assets.directory = ./dist`, `not_found_handling = 404-page` (serve `dist/404.html`).
- `.node-version` = `24`: Astro 7 richiede Node ≥ 22.23.4, l'immagine di build di Cloudflare potrebbe averne uno più vecchio.

### Limiti del piano gratuito (da ricontrollare sulla documentazione)

Richieste agli static assets gratuite e illimitate. Build limitate (ordine di centinaia/mese): conta ogni push,
non ogni commit. File singoli fino a ~25 MB → video su YouTube/Vimeo, non nel repository.

## 3. Stack

| Livello | Tecnologia | Note |
| --- | --- | --- |
| Runtime di sviluppo | Node.js 24, npm | |
| Framework | **Astro 7.4** | Vite 8, compilatore Rust, Markdown renderizzato con Sätteri (non più remark/rehype) |
| Linguaggio | TypeScript (strict) | `tsconfig.json` estende `astro/tsconfigs/strict` |
| Stile | **Tailwind CSS 4.3** via `@tailwindcss/vite` | Nessun `tailwind.config`: token definiti in `src/styles/global.css` con `@theme inline` |
| Contenuti | Markdown / MDX + Content Collections | Schemi Zod 4 (`import { z } from 'astro/zod'`) |
| Integrazioni | `@astrojs/mdx`, `@astrojs/sitemap` | Sitemap esclude `/cv/` |
| Font | `@fontsource-variable/inter`, `jetbrains-mono`, `source-serif-4` | Self-hosted (GDPR), niente Google Fonts |
| Evidenziazione codice | Shiki, doppio tema `github-light` / `github-dark-dimmed`, `defaultColor: false` | CSS in `global.css` sceglie il tema |
| Immagini | `astro:assets` (`<Image>`) | Copertine progetti opzionali |

Config rilevante in `astro.config.mjs`: `site: 'https://sabrichamtouri.com'`, `compressHTML: true`
(il default di Astro 7, `'jsx'`, toglie spazi tra elementi inline).

**Non usati di proposito:** React o altri framework UI, `@tailwindcss/typography` (vulnerabilità segnalata da
npm audit; stili `.prose` scritti a mano), adapter `@astrojs/cloudflare` (servirà solo con Keystatic).

## 4. Struttura del repository

```
.
├── CLAUDE.md                     # punto di ingresso per Claude
├── .claude/
│   ├── launch.json               # dev server per il pannello browser (astro-dev, porta 4321)
│   ├── memory/                   # questa memoria
│   └── skills/project-memory/    # skill per leggere/aggiornare la memoria
├── astro.config.mjs
├── wrangler.jsonc                # config Cloudflare Workers
├── .node-version                 # 24
├── public/                       # favicon.svg, robots.txt
└── src/
    ├── content.config.ts         # schemi delle collezioni
    ├── content/
    │   ├── profile.yaml          # entry unica "main"
    │   ├── projects/*.mdx        # il nome file è lo slug dell'URL
    │   ├── experience/*.md
    │   └── services/*.md
    ├── lib/content.ts            # getProfile, getProjects, getExperience, getServices, formatRange, formatYears, slugify
    ├── layouts/Base.astro        # <head>, SEO, JSON-LD Person, script anti-flash del tema, header/footer
    ├── components/               # Header, Footer, ThemeToggle, SectionLabel, Chip, ButtonLink,
    │                             # ProjectCard, ProjectCover, SkillsTable
    ├── pages/                    # rotte (vedi §6)
    └── styles/global.css         # token colori, tema chiaro/scuro, .prose, Shiki
```

## 5. Modello dati (`src/content.config.ts`)

### projects (glob `src/content/projects/**/*.{md,mdx}`)

| Campo | Tipo | Note |
| --- | --- | --- |
| `title`, `summary`, `role` | string | `summary` = 1-2 frasi per la card |
| `period.start` / `period.end` | date | `end` assente = in corso |
| `type` | `professional` \| `personal` \| `open-source` | |
| `nda` | boolean (default false) | badge "Details anonymized", nasconde `client`, `repoUrl`, `demoUrl` |
| `client` | string? | mostrato solo se `nda: false` |
| `technologies` | string[] | chip (max 5 sulla card) |
| `tags` | string[] | filtro su `/projects` (slugificati) |
| `cover` / `coverAlt` | image? / string? | senza cover → placeholder "schematico" generato |
| `repoUrl`, `demoUrl` | url? | |
| `featured` | boolean | primi 3 in home |
| `services` | reference('services')[] | collega progetti e servizi |
| `order` | number | più alto = prima; a parità, più recente prima |
| `draft` | boolean | `true` = escluso dal sito |
| corpo | MDX | struttura consigliata: Context, Problem, My role, Architecture, Technical highlights, Results, Lessons learned |

### experience

`company`, `position`, `location`, `start`, `end?`, `highlights[]`, `technologies[]`, `relatedProjects` (reference projects).
Ordinate per `start` decrescente.

### services

`title`, `summary`, `deliverables[]`, `order`; corpo Markdown opzionale. L'`id` (nome file) è l'ancora su `/services/#id`.

### profile (`file()` loader su `profile.yaml`, entry `main`)

`name`, `headline`, `shortBio`, `longBio[]`, `location`, `availableForFreelance`, `vatNumber?`, `focus[]{label,value}`,
`skills[]{group,items[]}`, `education[]`, `certifications[]`, `languages[]{name,level}`,
`links{email,github,linkedin,booking?}`.

## 6. Pagine

| Rotta | File | Contenuto |
| --- | --- | --- |
| `/` | `pages/index.astro` | Hero (nome serif, headline, bio, CTA, riquadro Focus + "Available for freelance"), 3 progetti featured, About + skill, servizi, box contatti |
| `/projects/` | `pages/projects/index.astro` | Griglia con filtro per tag (piccolo script; senza JS si vedono tutti) |
| `/projects/[slug]/` | `pages/projects/[slug].astro` | Dettaglio: badge NDA, copertina, scheda (ruolo, periodo, tecnologie, link), corpo MDX, servizi correlati |
| `/experience/` | `pages/experience.astro` | Timeline, skill, formazione, lingue, certificazioni |
| `/services/` | `pages/services.astro` | Servizi con deliverable e progetti correlati |
| `/contact/` | `pages/contact.astro` | Email, LinkedIn, GitHub, booking opzionale |
| `/cv/` | `pages/cv.astro` | CV A4 sempre chiaro, `@media print`, pulsante "Print / Save as PDF"; layout `bare` |
| `/privacy/` | `pages/privacy.astro` | Privacy policy (bozza, da rivedere) |
| 404 | `pages/404.astro` | Stile terminale |

## 7. Design system

Ispirazione (non copia): tema Astro **Tomoshibi** (https://tomoshibi.c12o.net): scuro, accento ambra,
etichette monospace, card progetti con chip, quasi zero JavaScript.

- **Tema:** scuro di default; interruttore per il chiaro (`ThemeToggle.astro`), scelta salvata in `localStorage['theme']`
  e applicata da uno script inline in `<head>` prima del paint (`<html data-theme="light">`). `/cv` è sempre chiaro.
- **Token** (CSS custom properties in `global.css`, esposti a Tailwind come `bg`, `surface`, `surface-2`, `line`, `fg`,
  `muted`, `accent`, `accent-fg`, `accent-soft`):

  | Token | Scuro | Chiaro |
  | --- | --- | --- |
  | `--bg` | `#0c0c0d` | `#f7f6f3` |
  | `--surface` | `#141416` | `#ffffff` |
  | `--border` | `#26262b` | `#e2dfd8` |
  | `--text` | `#ece9e4` | `#1c1a17` |
  | `--muted` | `#9b9a9f` | `#5f5c56` |
  | `--accent` | `#f2b34f` | `#9e5509` (scurito per contrasto AA con testo bianco) |

- **Font:** Inter (testo), JetBrains Mono (etichette, chip, codice; legature disattivate per non fondere "C++"),
  Source Serif 4 (nome e titoli grandi).
- **Elementi ricorrenti:** `SectionLabel` (etichetta mono maiuscola + contatore), `Chip`, `ButtonLink` (primary/secondary),
  placeholder copertina a griglia con `$ ./<slug>`.
- **Transizioni:** cross-document View Transitions in CSS (`@view-transition { navigation: auto }`), `view-transition-name`
  sulla copertina per animare card → dettaglio; disattivate con `prefers-reduced-motion`.
- **Mobile:** sotto `sm` il menu va su una seconda riga sotto il nome; nessuno scroll orizzontale (verificato a 375 px).

## 8. Flussi di lavoro

- **Locale:** `npm install`, `npm run dev` (http://localhost:4321), `npm run build` per verificare.
- **Pubblicazione:** l'utente fa commit e push su `main` → build e deploy automatici. Branch diversi da `main` → URL di anteprima.
- **Contenuti:** si modificano i file in `src/content/`; un campo mancante o sbagliato fa fallire la build con un messaggio chiaro.

## 9. Evoluzioni previste (non implementate)

- **Keystatic** (pannello admin su `/keystatic`, login GitHub OAuth, salva con commit). Richiederà l'adapter
  `@astrojs/cloudflare`, una GitHub App e variabili d'ambiente (client ID, client secret, secret di sessione) su Cloudflare.
  Alternativa: Decap CMS.
- **PDF del CV automatico** con Playwright dopo `astro build` (apre `/cv`, salva `cv.pdf`), oppure con una GitHub Action.
  Varianti del CV filtrate per tag.
- **Blog** (`/blog`, collezione già prevista concettualmente), **i18n** con l'italiano, **Mermaid** per i diagrammi,
  **Open Graph image** dedicata.
