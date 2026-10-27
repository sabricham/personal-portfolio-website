# Requisiti

Obiettivi e regole del progetto. Deriva dal documento iniziale "Portfolio Website – Architettura e Scelte di Progetto"
(scritto da un altro agente e fornito dall'utente il 2026-10-27), riorganizzato e aggiornato.

## Obiettivi e pubblico

- **Carriera:** farsi trovare da recruiter e aziende, soprattutto all'estero, con una presenza che si distingua da CV e LinkedIn.
- **Freelance:** mostrare subito ai potenziali clienti cosa si sa fare, con progetti concreti e servizi chiari.
- **Profilo:** Embedded Software Engineer – Embedded Linux, Yocto, Test Automation / HIL, CI per l'embedded.
- **Lingua del sito:** inglese (italiano eventualmente in futuro).
- **Call to action:** contatto via email o LinkedIn, download del CV.

## Vincoli

- Costo minimo: solo il dominio (~10-15 €/anno), nessun abbonamento.
- Deploy semplice e automatico; massima personalizzazione; poco tempo sul codice, molto sui contenuti.
- Sito statico: niente database né server da mantenere.
- Il sito stesso deve dimostrare competenza tecnica (pulizia, velocità, accessibilità).

## Contenuti

- 3-6 progetti, a partire dal sistema di test HIL su Yocto (versione anonimizzata).
- Struttura consigliata per ogni progetto: Context, Problem, My role, Architecture (con diagramma),
  Technical highlights, Results, Lessons learned.
- Per compensare i dettagli coperti da NDA: diagrammi originali ridisegnati, progetti personali o open source sugli
  stessi temi (es. mini framework HIL su Raspberry Pi / STM32 pubblicato su GitHub).
- Servizi freelance: distribuzioni Yocto e BSP, sistemi di test HIL, CI per l'embedded (eventualmente sviluppo firmware).
  Ogni servizio collegato ai progetti relativi.

## Riservatezza (NDA)

- Prima di pubblicare un progetto professionale ricontrollare il contratto e l'obbligo di fedeltà (art. 2105 c.c.).
- **Si può dire:** ruolo, tipo di sistema, tecnologie, architettura generica ridisegnata, risultati qualitativi o approssimati.
- **Da evitare:** nomi di cliente e prodotto non pubblici, codice, schemi, foto o screenshot reali, dettagli che identificano il prodotto.
- In caso di dubbio: consenso scritto dell'azienda. Nel sito: `nda: true` sul progetto.

Esempio di descrizione anonima:

> Designed and developed a Hardware-in-the-Loop test system for automated regression testing of an embedded product,
> built on a custom Yocto-based Linux distribution, with application services interfacing the device under test and
> integrated into the CI pull-request workflow.

## Compliance (non è consulenza legale)

- **Privacy policy** obbligatoria (GDPR): email ricevute, log tecnici di Cloudflare, analytics. Pagina `/privacy` presente in bozza.
- **Cookie:** nessun banner necessario finché si usano solo Cloudflare Web Analytics e `localStorage` per il tema.
  Video YouTube: usare `youtube-nocookie.com` o caricamento al clic.
- **Partita IVA:** se si opera come freelance va indicata sul sito (`vatNumber` in `profile.yaml`, mostrata nel footer).
- **Font** ospitati in locale (già fatto).
- **Accessibilità:** testo alternativo per le immagini, contrasto adeguato (AA), HTML semantico, skip link, focus visibile.

## SEO e visibilità

- Titolo e meta description per pagina, Open Graph (anteprime su LinkedIn), canonical. *(fatto, manca un'immagine OG)*
- Sitemap (`@astrojs/sitemap`) e `robots.txt`. *(fatto)*
- Dati strutturati `Person` in JSON-LD. *(fatto)*
- Link al sito da LinkedIn, README del profilo GitHub, firme email. *(da fare a fine contenuti)*
- Obiettivo Lighthouse 90+.

## Riferimenti

- Astro: https://astro.build · Temi: https://astro.build/themes/ (filtri Pricing → Free, categoria Portfolio)
- Ispirazione design: Tomoshibi https://tomoshibi.c12o.net
- Idea CV YAML → web + PDF: astro-awesome-cv https://astro-awesome-cv.sek4.com
- Keystatic https://keystatic.com · Decap CMS https://decapcms.org · Playwright https://playwright.dev · Mermaid https://mermaid.js.org
- Esempi di portfolio: https://embeddedresume.com/portfolio/, https://github.com/emmabostian/developer-portfolios
