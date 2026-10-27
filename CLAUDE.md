# sabrichamtouri.com

Portfolio personale di Sabri Chamtouri, Embedded Software Engineer (Embedded Linux, Yocto, HIL / test automation).
Sito statico in inglese, costruito con Astro 7 + Tailwind CSS 4 e pubblicato su Cloudflare Workers (static assets)
all'indirizzo https://sabrichamtouri.com.

## Memoria del progetto

La memoria persistente è in `.claude/memory/` ed è versionata con il codice.
**All'inizio di ogni sessione** leggi almeno `status.md`; per lavori di codice leggi anche `architecture.md`.
**Prima di chiudere un lavoro** aggiorna la memoria seguendo la skill `project-memory`
(`.claude/skills/project-memory/SKILL.md`).

| File | Contenuto |
| --- | --- |
| `.claude/memory/status.md` | Stato attuale, roadmap, TODO aperti |
| `.claude/memory/architecture.md` | Stack, infrastruttura, struttura del codice, modello dati, design system, deploy |
| `.claude/memory/decisions.md` | Registro delle decisioni con data e motivazione |
| `.claude/memory/requirements.md` | Obiettivi, pubblico, regole sui contenuti (NDA), compliance, SEO |

## Come collaborare con l'utente

- Rispondi in **italiano**; il contenuto del sito e i commenti nel codice sono in **inglese**.
- L'utente è un ingegnere embedded, non uno sviluppatore web: spiega i concetti web con paragoni dal mondo
  embedded (Astro ≈ Doxygen / Yocto, schemi dei contenuti ≈ struct validate a compile-time).
- **Divisione dei compiti:** Claude scrive il codice; l'utente fa commit e push e configura Cloudflare.
  Non fare commit o push se l'utente non lo chiede.
- L'utente detta spesso con il microfono: parole strane possono essere errori di trascrizione
  (es. "Haskell" = "Astro", "d'oxygen" = "Doxygen").

## Comandi

```bash
npm run dev      # http://localhost:4321
npm run build    # build di produzione in dist/
```

Il server di sviluppo per il pannello browser è definito in `.claude/launch.json` (`astro-dev`).
