# Stato del progetto

## Stato attuale (2026-10-27)

- Prima versione del sito **online e funzionante** su Cloudflare Workers (confermato dall'utente).
- Dominio `sabrichamtouri.com` acquistato; collegamento come custom domain indicato all'utente.
- Tutti i **contenuti sono di esempio** (in inglese), basati sul documento iniziale: vanno sostituiti con quelli reali
  prima di condividere il link.
- Build locale pulita: 11 pagine, nessun errore in console, `npm audit` senza vulnerabilità.
- Verificato nel browser: desktop e mobile (375 px), tema chiaro/scuro, filtro progetti, CV stampabile.

## Roadmap

**Fase 1 – Fondamenta**
- [x] Scelta dello stack e del design (ispirazione Tomoshibi)
- [x] Progetto Astro con Tailwind e MDX, schemi delle collezioni
- [x] Tutte le pagine della mappa del sito (home, projects, dettaglio, experience, services, contact, cv, privacy, 404)
- [x] Repository su GitHub e deploy automatico su Cloudflare Workers
- [ ] Verificare custom domain `sabrichamtouri.com` (ed eventualmente `www`) e HTTPS

**Fase 2 – Contenuti** *(prossimo passo)*
- [ ] Bio e headline reali in inglese (`profile.yaml`)
- [ ] Link LinkedIn reale (ora segnaposto `your-profile`)
- [ ] Formazione, lingue, certificazioni, skill reali
- [ ] Esperienze reali (`experience/`), con nomi generici se riservate
- [ ] 3-6 progetti reali, a partire dal sistema HIL su Yocto (anonimizzato, controllare NDA)
- [ ] Copertine/diagrammi dei progetti
- [ ] Rivedere i testi dei servizi

**Fase 3 – CV e pannello**
- [x] Pagina `/cv` stampabile
- [ ] PDF generato automaticamente (Playwright) e pulsante "Download PDF"
- [ ] Keystatic con login GitHub in produzione

**Fase 4 – Lancio**
- [ ] Email Routing (`hello@sabrichamtouri.com`)
- [ ] Cloudflare Web Analytics
- [ ] Rivedere la privacy policy; partita IVA nel footer se freelance
- [ ] Immagine Open Graph
- [ ] Test Lighthouse, controllo link
- [ ] Link al sito da LinkedIn, GitHub, firme email

**Fase 5 – Futuro**
- [ ] Blog tecnico
- [ ] Varianti del CV per target diversi
- [ ] Versione italiana (i18n)

## TODO aperti

- `profile.yaml`: tutti i valori sono esempi (università "University Name", date, LinkedIn).
- I tre progetti in `src/content/projects/` sono esempi: `hil-test-system`, `custom-yocto-distribution`, `mini-hil-framework`.
- Le due esperienze in `src/content/experience/` sono esempi.
- `privacy.astro`: testo di partenza, data "Last updated" scritta a mano.

## Ultima sessione (2026-10-27)

Scelti stack, design e infrastruttura; costruita la prima versione completa del sito con contenuti di esempio;
configurato il deploy su Cloudflare Workers (aggiunti `wrangler.jsonc` e `.node-version`); il sito è online.
Creata la memoria del progetto (`CLAUDE.md`, `.claude/memory/`, skill `project-memory`).
