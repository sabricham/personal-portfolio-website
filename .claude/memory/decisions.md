# Registro delle decisioni

Una voce per decisione, in ordine cronologico. Le decisioni superate non si cancellano: si segnano con "Superata da".

### 2026-10-27 – Sito statico sviluppato in proprio
**Decisione:** sito statico scritto da noi, non un website builder.
**Perché:** il sito dimostra le competenze tecniche, costa solo il dominio, contenuti versionati su Git, nessun lock-in.
**Alternative scartate:** Wix, Squarespace, Framer (10-25 €/mese per un dominio personalizzato).

### 2026-10-27 – Astro + Tailwind + Markdown/MDX
**Decisione:** Astro come generatore di siti statici, Tailwind CSS per lo stile, contenuti in Markdown/MDX con
Content Collections tipizzate.
**Perché:** pensato per siti di contenuti, HTML statico, schemi validati in build, nessun JavaScript inutile.

### 2026-10-27 – Dominio sabrichamtouri.com su Cloudflare
**Decisione:** `.com` acquistato su Cloudflare Registrar (a prezzo di costo), DNS su Cloudflare.
**Perché:** stesso fornitore per dominio, DNS, hosting, email routing e analytics.

### 2026-10-27 – Tema come ispirazione, codice scritto da zero
**Decisione:** nessun tema clonato; design ispirato a Tomoshibi, struttura e codice costruiti sul modello dati del progetto.
**Perché:** il codice lo scrive Claude, quindi adattare un tema costerebbe più che costruire; i temi non hanno NDA badge,
servizi collegati ai progetti e CV stampabile.
**Alternative scartate:** Starfolio (React, progetti senza pagina di dettaglio), Astrofy, Codefolio, SWP Freelancer.

### 2026-10-27 – Tema scuro di default con interruttore chiaro
**Decisione:** scuro di default, toggle per il chiaro salvato in `localStorage`; `/cv` sempre chiaro.
**Perché:** scelta dell'utente; il CV deve essere stampabile.

### 2026-10-27 – Niente React, niente `@tailwindcss/typography`
**Decisione:** solo componenti `.astro`; stili del testo lungo (`.prose`) scritti a mano.
**Perché:** meno dipendenze e meno JavaScript; il plugin typography portava una vulnerabilità (postcss-selector-parser)
segnalata da `npm audit`.

### 2026-10-27 – Font self-hosted (Inter, JetBrains Mono, Source Serif 4)
**Decisione:** font da pacchetti `@fontsource-variable`, serviti dal sito stesso.
**Perché:** GDPR (niente richieste a Google Fonts) e prestazioni.

### 2026-10-27 – Keystatic e PDF automatico del CV rimandati
**Decisione:** prima versione al 100% statica, contenuti modificati a mano nei file; CV in PDF tramite "Print / Save as PDF".
**Perché:** Keystatic richiede adapter Cloudflare, GitHub App e segreti; si aggiunge quando i contenuti sono stabili.

### 2026-10-27 – Progetto nella cartella OneDrive
**Decisione:** il progetto resta in `C:\Users\sabri\OneDrive\Projects\sabrichamtouri.com`.
**Perché:** preferenza dell'utente. Rischio noto: OneDrive sincronizza `node_modules` e può dare errori `EPERM` durante
`npm install`; in quel caso mettere in pausa la sincronizzazione.

### 2026-10-27 – Cloudflare Workers (static assets) invece di Pages
**Decisione:** deploy con Workers Builds + `wrangler.jsonc` (`assets.directory = ./dist`).
**Perché:** il flusso "Create application" della dashboard propone Workers; Cloudflare sta convergendo su Workers;
per un sito statico è gratuito come Pages.
**Alternative scartate:** Cloudflare Pages (pianificato nel documento iniziale, equivalente ma in via di superamento).

### 2026-10-27 – Node 24 fissato per le build
**Decisione:** file `.node-version` con `24`.
**Perché:** Astro 7 richiede Node ≥ 22.23.4; l'immagine di build di Cloudflare potrebbe usarne uno più vecchio.

### 2026-10-27 – Memoria del progetto versionata nel repository
**Decisione:** memoria in `.claude/memory/`, skill `project-memory`, `CLAUDE.md` come punto di ingresso; tutto committato.
**Perché:** richiesta dell'utente; il contesto deve sopravvivere tra sessioni e macchine.
