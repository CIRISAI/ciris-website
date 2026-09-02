# CIRIS Italian Glossary (Italiano)

This glossary defines the canonical translations for key CIRIS terms in Italian. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Italian | Usage Context |
|---------|---------|---------------|
| OBSERVE | Osserva | Gathering information from environment |
| SPEAK | Parla | Communicating with users |
| TOOL | Strumento | Using external capabilities |
| REJECT | Rifiuta | Refusing to perform an action |
| PONDER | Rifletti | Deep reflection before deciding |
| DEFER | Differisci | Referring to Wise Authority |
| MEMORIZE | Memorizza | Storing information in memory |
| RECALL | Richiama | Retrieving from memory |
| FORGET | Dimentica | Removing from memory |
| TASK_COMPLETE | Attività Completata | Signaling task completion |

## Core Concepts

| English | Italian | Definition |
|---------|---------|------------|
| ACCORD | [DEPRECATED] ACCORD | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior (keep in English) When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | Wise Authority | Human oversight entity (keep in English) |
| Conscience | Coscienza | Ethical filter mechanism |
| Principal Hierarchy | Gerarchia dei Principi | Chain of command for guidance |
| Coherence | Coerenza | Logical and contextual consistency |
| Epistemic Humility | Umiltà Epistemica | Acknowledging knowledge limits |
| Integrity | Integrità | Ethical consistency |
| Resilience | Resilienza | Recovery from failures |
| Signalling Gratitude | Segnalazione della Gratitudine | Acknowledging contributions |
| Ethical | Etico/Etica | Relating to ethics or moral principles |

## Technical Terms

| English | Italian | Notes |
|---------|---------|-------|
| Agent | Agente | Technical term |
| API | API | Keep in English |
| DMA | DMA | Decision-Making Adapter - keep in English |
| LLM | LLM | Large Language Model - keep in English |
| Token | Token | Authentication/LLM context |
| Adapter | Adattatore | Service extension |
| Service | Servizio | System component |
| Pipeline | Pipeline | Processing chain - keep in English |
| Provider | Provider | Service provider - keep in English |

## Cognitive States

| English | Italian | Description |
|---------|---------|-------------|
| WAKEUP | RISVEGLIO | Identity confirmation state |
| WORK | LAVORO | Normal task processing |
| PLAY | GIOCO | Creative exploration mode |
| SOLITUDE | SOLITUDINE | Quiet reflection state |
| DREAM | SOGNO | Deep introspection |
| SHUTDOWN | SPEGNIMENTO | Graceful termination |

## UI Labels

| English | Italian | Notes |
|---------|---------|-------|
| Login | Accedi | Verb form preferred for action |
| Settings | Impostazioni | |
| Messages | Messaggi | |
| Send | Invia | |
| Cancel | Annulla | |
| Confirm | Conferma | |
| Error | Errore | |
| Warning | Avviso | |
| Success | Successo | |
| Loading | Caricamento | |
| Continue | Continua | |
| Back | Indietro | |
| Next | Avanti | |
| Finish | Completa | |
| Save | Salva | |
| Close | Chiudi | |
| Retry | Riprova | |
| Refresh | Aggiorna | |

## DMA-Specific Terms

| English | Italian | Used In |
|---------|---------|---------|
| Principal Duties | Doveri Principali | PDMA |
| Common Sense | Senso Comune | CSDMA |
| Intuition | Intuizione | IDMA |
| Action Selection | Selezione Azione | ASPDMA |
| Domain Specific | Dominio Specifico | DSDMA |
| Tool Specific | Strumento Specifico | TSASPDMA |
| Evaluation | Valutazione | All DMAs |
| Ethical Reasoning | Ragionamento Etico | PDMA |
| Context | Contesto | System snapshots |

## Processing Stages

| English | Italian | Context |
|---------|---------|---------|
| Thinking | Pensando | Initial thought processing |
| Gathering context | Raccolta contesto | Context enrichment phase |
| Evaluating | Valutazione | DMA evaluation |
| Verifying epistemic diversity | Verifica diversità epistemica | IDMA phase |
| Selecting action | Selezione azione | Action selection phase |
| Refining tool parameters | Raffinamento parametri strumento | TSASPDMA phase |
| Verifying ethics | Verifica etica | Conscience check |
| Speaking | Parlando | SPEAK action execution |
| Using tool | Utilizzo strumento | TOOL action execution |
| Reflecting | Riflessione | PONDER action |
| Saving to memory | Salvataggio in memoria | MEMORIZE action |
| Recalling | Richiamo | RECALL action |

## Phrases

| English | Italian |
|---------|---------|
| "Hello! How can I help you today?" | "Ciao! Come posso aiutarti oggi?" |
| "Let me think..." | "Fammi pensare..." |
| "I need to consult a human advisor on this matter" | "Devo consultare un consulente umano su questo argomento" |
| "Task completed successfully" | "Attività completata con successo" |
| "I cannot perform this action" | "Non posso eseguire questa azione" |
| "Could you clarify what you mean?" | "Potresti chiarire cosa intendi?" |
| "I don't have permission to do that" | "Non ho il permesso di farlo" |

## Wallet & Financial Terms

| English | Italian | Context |
|---------|---------|---------|
| Wallet | Portafoglio | Financial adapter |
| Send money | Invia denaro | Transaction action |
| Request payment | Richiedi pagamento | Payment request |
| Statement | Estratto conto | Account statement |
| Balance | Saldo | Account balance |
| Currency | Valuta | Money type |
| Transaction | Transazione | Financial operation |
| Recipient | Destinatario | Payment receiver |
| Amount | Importo | Payment amount |

## System & Status Terms

| English | Italian | Context |
|---------|---------|---------|
| Executing | In esecuzione | Task in progress |
| Completed | Completato | Task finished |
| Failed | Fallito | Task/action failure |
| Pending | In sospeso | Awaiting action |
| Online | Online | Service available |
| Offline | Offline | Service unavailable |
| Connected | Connesso | Connection active |
| Disconnected | Disconnesso | Connection lost |
| Idle | Inattivo | No active processing |
| Processing | Elaborazione | Active work |

## Cultural Considerations

### Formality Level
- Use **informal "tu"** form for conversational UI and chat interactions (e.g., "Come posso aiutarti?")
- Use **formal language** for legal/official documentation and system messages
- For action buttons and commands, use **imperative verb forms** (e.g., "Invia", "Annulla", "Conferma")
- Technical terms borrowed from English (API, LLM, DMA) remain unchanged

### Grammar Notes
- **Gender agreement**: Italian nouns have gender (masculine/feminine), ensure adjectives and articles agree
  - "il servizio" (masculine) → "servizio attivo"
  - "la configurazione" (feminine) → "configurazione attiva"
- **Verb forms**: Use infinitive for menu items, imperative for buttons
  - Menu: "Configurare" (infinitive)
  - Button: "Configura" (imperative)
- **Capitalization**: Unlike English, Italian uses lowercase for:
  - Days of week: lunedì, martedì
  - Months: gennaio, febbraio
  - Languages: italiano, inglese
  - Titles: only capitalize first word (except proper nouns)

### Technical English Loanwords
The following terms are commonly kept in English in Italian technical contexts:
- API, LLM, DMA, ACCORD, provider, pipeline
- OAuth, token, hash, blockchain
- Hardware/software technical components

### Regional Considerations
- Standard Italian (italiano standard) is understood across all Italian-speaking regions
- Avoid regional dialects or colloquialisms in UI text
- Currency amounts use comma for decimals: €10,50 (not €10.50)

### UI labels and review conduct (ciris.ai)
- Keys under `nav.*`, `footer.*`, `lobby.store.*`, and any key ending in `Label`, `Title`, `Btn`, `Cta`, `Head`, `Eyebrow`, `Kicker` or `name` are compact UI labels or headings. Translate them as a noun phrase in this language's own label convention: no leading article unless the language requires one on a label, and the language's own casing for labels.
- Glossary casing is not normative (the glossary block header says so). Capitalization alone is never a finding, at any severity.
- Agreement with this glossary or with the anchors is NOT a finding. Report a terminology finding only when the translation disagrees with them.
- `lobby.store.*` strings are the two lines of an App Store / Google Play badge ("Download on the" + "App Store", "Get it on" + "Google Play"). Judge each line as half of the standard badge wording, never as a sentence.
- When the English source itself says Accord (a historical reference to the document the Constitution replaced), keep the shipped rendering the anchors use. The retired term in the source is not a terminology finding.

## DSASPDMA Deferral Taxonomy Terms

| English | Localized | Notes |
|---------|-----------|-------|
| DSASPDMA | DSASPDMA | Keep acronym in English |
| Deferral-Specific Action Selection | SELEZIONE DELL'AZIONE SPECIFICA PER IL DEFERIMENTO | DSASPDMA prompt title |
| Rights / Needs Taxonomy | TASSONOMIA DIRITTI / BISOGNI | Taxonomy section heading |
| Rights basis | Base dei diritti | Label for treaty-aligned rights basis |
| Operational Deferral Reason | CODICI DI RAGIONE OPERATIVA DEL DEFERIMENTO | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## CEG 0.6 Cohort-Scope Vocabulary (Commons hub — 2.9.4)

| English | Italian | Notes |
|---------|---------|-------|
| Cohort scope | Ambito di coorte | CEG 0.6 wire-format term; technical CIRIS term. Wire key `cohort_scope` stays in English |
| Layer | Strato | UX surface representing one cohort scope |
| Agent (Self) | Agente (Sé) | First layer; "Agente" stays per glossary, "Sé" = reflexive self |
| Family | Famiglia | "Siblings of the same agent" — sharing operator identity, not nuclear-family |
| Local Community | Comunità Locale | Locally-trusted peers — home channel, household, single guild |
| Global Communities | Comunità Globali | Plural — affinity groups spanning across borders (CEG affiliations) |
| Global Commons | Bene Comune Globale | Universal federation layer (CEG species + planet + federation folded) |
| Federation | Federazione | The CIRIS federation as network of peers (matches existing `network.*` usage) |
| The Commons | Il Bene Comune | Federation contribution cards screen (distinct from Global Commons layer) |
| Constitutional | Costituzionale | Accord-holder identity surface per FSD-002 §4.1 |
| Delegation | Delega | Delegation graph — scopes delegated to/from this agent |
| Trust Topology | Topologia di Fiducia | Federation trust graph — peers as nodes, trust grants as edges |
| Participate | Partecipa | Federation needs registry — verb form (take part / contribute) |

## Commons UI Labels (2.9.4)

| English | Italian | Notes |
|---------|---------|-------|
| Identities | Identità | List of known entities at a scope |
| Trust | Fiducia | Trust state per identity |
| Trust policies | Politiche di fiducia | Policies that govern automatic trust at this scope |
| Coming Soon | In arrivo | Placeholder for unshipped features (matches existing `network.tiles.coming_soon_badge`) |

## Version History

- Version | Date | Changes
- 1.0 | 2026-03-27 | Initial glossary based on it.json localization file
- 1.1 | 2026-05-31 | Added CEG 0.6 cohort-scope vocabulary and Commons UI labels for 2.9.4 Commons hub

---

*This glossary is the authoritative source for Italian translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | La mesh costituzionale | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | Prova di beneficio (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | il web epistemico | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | Ratchet di Coerenza | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | Costituzione | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | Punteggio CIRIS | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | caso di sicurezza | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Meta-Goal M-1 | Meta-Goal M-1 | The Constitution's top-level goal; M-1 is a label, keep it |
| Constitutional AI | Constitutional AI | Anthropic's training method, a proper name: keep it in English exactly; it is NOT the CIRIS Constitution and the Constitution row does not apply to it |
