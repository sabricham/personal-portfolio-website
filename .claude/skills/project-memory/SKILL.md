---
name: project-memory
description: Legge e aggiorna la memoria persistente del progetto in .claude/memory/ (stato, architettura, decisioni, requisiti). Usala all'inizio di una sessione per riprendere il contesto, e alla fine di ogni lavoro che cambia codice, infrastruttura, contenuti o decisioni, oppure quando l'utente chiede di "ricordare", "salvare in memoria" o "aggiornare la memoria".
---

# Memoria persistente del progetto

La memoria vive in `.claude/memory/` ed è versionata in Git insieme al codice (non va mai messa in `.gitignore`).
Serve a far ripartire qualsiasi sessione futura, su qualsiasi macchina, senza rileggere tutta la cronologia.

## File

| File | Cosa contiene | Quando si aggiorna |
| --- | --- | --- |
| `status.md` | Stato attuale del sito, roadmap a fasi con checkbox, TODO aperti, ultima sessione | Alla fine di **ogni** sessione di lavoro |
| `architecture.md` | Stack e versioni, infrastruttura Cloudflare, struttura delle cartelle, modello dati, design system, pagine, deploy | Quando cambia il codice in modo strutturale (nuove pagine, schemi, dipendenze, config) |
| `decisions.md` | Registro delle decisioni: data, decisione, motivazione, alternative scartate | Ogni volta che si sceglie tra più opzioni |
| `requirements.md` | Obiettivi, pubblico, regole NDA, compliance (GDPR, cookie), SEO, linee guida per i contenuti | Quando l'utente cambia obiettivi o regole |

## Leggere (inizio sessione)

1. Leggi `status.md` per sapere a che punto siamo e cosa resta da fare.
2. Se il lavoro tocca il codice, leggi `architecture.md`.
3. Prima di proporre una scelta tecnica, controlla `decisions.md`: non riproporre alternative già scartate
   senza un motivo nuovo.
4. Verifica che ciò che la memoria dice esista ancora (file, script, versioni) prima di basarti su di essa.

## Aggiornare (fine lavoro)

1. **status.md:** aggiorna "Stato attuale", spunta le voci della roadmap completate, aggiungi o chiudi TODO,
   e riscrivi la sezione "Ultima sessione" (data + 2-4 righe su cosa è stato fatto).
2. **architecture.md:** aggiorna solo le sezioni toccate. Deve descrivere com'è il progetto **adesso**,
   non la sua storia.
3. **decisions.md:** aggiungi una voce in fondo per ogni nuova decisione, nel formato:

   ```markdown
   ### AAAA-MM-GG – Titolo breve
   **Decisione:** cosa si è scelto.
   **Perché:** motivazione.
   **Alternative scartate:** opzioni valutate e perché no (se rilevante).
   ```

   Se una decisione viene superata, non cancellarla: aggiungi una nuova voce e segna la vecchia con
   `**Superata da:** <data – titolo>`.
4. **requirements.md:** solo se l'utente cambia obiettivi o regole.

## Regole

- **Date assolute** (AAAA-MM-GG), mai "ieri" o "la settimana scorsa".
- **Niente segreti:** mai token, password, client secret o dati personali non pubblici. Al massimo il nome
  della variabile d'ambiente.
- **Conciso:** frasi brevi, elenchi, tabelle. Niente che si ricavi in un attimo dal codice (per esempio il contenuto
  dei singoli componenti), solo ciò che serve a orientarsi e a capire il perché.
- **Lingua:** italiano, come le conversazioni con l'utente. Nomi di file, comandi e codice restano invariati.
- Dopo l'aggiornamento, di' all'utente in una riga quali file di memoria sono cambiati. Il commit lo fa l'utente.
