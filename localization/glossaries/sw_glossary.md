# CIRIS Swahili Glossary (Kiswahili)

This glossary defines the canonical translations for key CIRIS terms in Swahili. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Swahili | Usage Context |
|---------|---------|---------------|
| OBSERVE | Chunguza | Gathering information from environment |
| SPEAK | Sema | Communicating with users |
| TOOL | Zana | Using external capabilities |
| REJECT | Kataa | Refusing to perform an action |
| PONDER | Fikiria | Deep reflection before deciding |
| DEFER | Ahirisha | Referring to Wise Authority |
| MEMORIZE | Kumbuka | Storing information in memory |
| RECALL | Rudisha | Retrieving from memory |
| FORGET | Sahau | Removing from memory |
| TASK_COMPLETE | Kazi Imekamilika | Signaling task completion |

## Core Concepts

| English | Swahili | Definition |
|---------|---------|------------|
| ACCORD | [DEPRECATED] Mkataba | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | Mshauri wa Kibinadamu | Human oversight entity |
| Conscience | Dhamiri | Ethical filter mechanism |
| Principal Hierarchy | Uratibu wa Viongozi | Chain of command for guidance |
| Coherence | Upatanifu | Logical and contextual consistency |
| Epistemic Humility | Unyenyekevu wa Maarifa | Acknowledging knowledge limits |
| Integrity | Uadilifu | Ethical consistency |
| Resilience | Uthabiti | Recovery from failures |
| Signalling Gratitude | Kuonyesha Shukrani | Acknowledging contributions |

## Technical Terms

| English | Swahili | Notes |
|---------|---------|-------|
| Agent | Wakala | Standard technical term |
| API | API | Keep in English |
| DMA | DMA | Decision-Making Adapter |
| LLM | LLM | Large Language Model |
| Token | Tokeni | Authentication/LLM context |
| Adapter | Adapter | Service extension |
| Service | Huduma | System component |
| Pipeline | Bomba / Mkondo | Processing chain |

## Cognitive States

| English | Swahili | Description |
|---------|---------|-------------|
| WAKEUP | AMKA | Identity confirmation state |
| WORK | KAZI | Normal task processing |
| PLAY | MCHEZO | Creative exploration mode |
| SOLITUDE | UPWEKE | Quiet reflection state |
| DREAM | NDOTO | Deep introspection |
| SHUTDOWN | ZIMA | Graceful termination |

## UI Labels

| English | Swahili | Notes |
|---------|---------|-------|
| Login | Ingia | |
| Settings | Mipangilio | |
| Messages | Jumbe / Mazungumzo | Context dependent |
| Send | Tuma | |
| Cancel | Ghairi | |
| Confirm | Thibitisha | |
| Error | Hitilafu | |
| Warning | Onyo | |
| Success | Mafanikio | |
| Loading | Inapakia | |
| Continue | Endelea | |
| Back | Rudi | |
| Next | Ifuatayo | |
| Finish | Maliza | |

## DMA-Specific Terms

| English | Swahili | Used In |
|---------|---------|---------|
| Principal Duties | Wajibu wa Kimsingi | PDMA |
| Common Sense | Akili ya Kawaida | CSDMA |
| Intuition | Hisia / Fahamu | IDMA |
| Action Selection | Uchaguzi wa Kitendo | ASPDMA |
| Domain Specific | Mahususi ya Eneo | DSDMA |
| Tool Specific | Mahususi ya Zana | TSASPDMA |

## System Status Terms

| English | Swahili | Context |
|---------|---------|---------|
| Executing | Inatekelezwa | Task in progress |
| Completed | Imekamilika | Task finished |
| Failed | Imeshindikana | Task error |
| Pending | Inasubiri | Awaiting execution |
| Online | Mtandaoni | Connected state |
| Offline | Nje ya mtandao | Disconnected state |
| Success | Mafanikio | Positive outcome |
| Processing | Inashughulikia | Active processing |

## Pipeline Stages (H3ERE)

| English | Swahili | Stage Description |
|---------|---------|-------------------|
| Think | Fikiri | Start thinking process |
| Context | Muktadha | Gather context |
| DMA | DMA | Decision making |
| IDMA | IDMA | Intuition check |
| Select | Chagua | Select action |
| Ethics | Maadili | Ethics check |
| Act | Tenda | Execute action |

## Memory Scope Terms

| English | Swahili | Description |
|---------|---------|-------------|
| Local | Ndani | Local scope |
| Identity | Utambulisho | Identity scope |
| Environment | Mazingira | Environment scope |
| Community | Jamii | Community scope |

## Phrases

| English | Swahili |
|---------|---------|
| "How can I help you?" | "Ninawezaje kukusaidia leo?" |
| "I need to think about this" | "Niruhusu nifikirie kuhusu hilo..." |
| "Let me check with my Wise Authority" | "Nahitaji kushauriana na mshauri wa kibinadamu kuhusu hili." |
| "Task completed successfully" | "Kazi imekamilika kwa mafanikio." |
| "I cannot perform this action" | "Sina ruhusa ya kufanya hivyo." |
| "Please clarify what you meant" | "Je, unaweza kufafanua ulichomaanisha?" |

## Wallet & Financial Terms

| English | Swahili | Context |
|---------|---------|---------|
| Wallet | Mkoba | Digital wallet |
| Balance | Salio | Account balance |
| Send money | Tuma pesa | Money transfer |
| Receive | Pokea | Receive funds |
| Transaction | Uhamisho | Financial transaction |
| Recipient | Mpokeaji | Payment recipient |
| Amount | Kiasi | Payment amount |
| Gas fees | Ada za gesi | Blockchain fees |
| Address | Anwani | Wallet address |

## Adapter Terms

| English | Swahili | Context |
|---------|---------|---------|
| Navigation | Uongozaji | Navigation adapter |
| Weather | Hali ya Hewa | Weather adapter |
| Geocode | Kuratibu za Kijiografia | Address to coordinates |
| Route | Njia | Travel route |
| Location | Mahali | Geographic location |
| Coordinates | Kuratibu | Latitude/longitude |

## Cultural Considerations

### Formality Level
- Use standard Swahili (Kiswahili sanifu) for ACCORD and official documentation
- Use conversational Swahili for UI strings and chat messages
- Technical terms may use English loan words where standard in Swahili tech contexts

### Honorifics
- When addressing users, maintain respectful tone
- For Wise Authority references, use respectful terminology like "mshauri wa kibinadamu"

### Language Notes
- Swahili uses verb prefixes to indicate tense and subject
- Present continuous: "Ina-" prefix (e.g., "Inapakia" = Loading)
- Completed action: "Ime-" prefix (e.g., "Imekamilika" = Completed)
- Failed action: "Ime-" + verb + "-kana" (e.g., "Imeshindikana" = Failed)
- Infinitive/command: No prefix or use stem (e.g., "Tuma" = Send)

### Technical Adaptations
- Many technical terms are borrowed from English and adapted: API, LLM, Token
- Computer/internet terms often use English directly: "online" → "mtandaoni"
- New technical concepts may use descriptive phrases: "blockchain" → "mnyororo wa vitalu"

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
| Deferral-Specific Action Selection | UCHAGUZI WA HATUA MAALUM KWA UAHIRISHAJI | DSASPDMA prompt title |
| Rights / Needs Taxonomy | TAKSONOMIA YA HAKI / MAHITAJI | Taxonomy section heading |
| Rights basis | Msingi wa haki | Label for treaty-aligned rights basis |
| Operational Deferral Reason | MISIMBO YA SABABU ZA KIUTENDAJI ZA UAHIRISHAJI | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## CEG 0.6 Cohort Scope Vocabulary (2.9.4 Commons UX)

| English | Swahili | Notes |
|---------|---------|-------|
| Cohort scope | Upeo wa kundi (cohort scope) | Technical CIRIS term — keep loan-word recognizable |
| Layer | Tabaka | Natural Swahili word for level/tier |
| Agent (Self) | Wakala (Nafsi) | Wakala stays per glossary; Nafsi = self/being |
| Family | Familia | Sibling occurrences of same agent |
| Local Community | Jamii ya Karibu | Locally-trusted peers; geographic proximity |
| Global Communities | Jumuiya za Kimataifa | Plural — cross-border affinity groups |
| Global Commons | Mali ya Pamoja ya Kimataifa | Universal federation layer; shared public space |
| Federation | Shirikisho | Per existing network glossary usage |
| The Commons | Mali ya Pamoja | Federation contribution feed (distinguished from Global Commons cohort scope) |
| Constitutional | Kikatiba | Refers to federation constitutional structure, not state law |
| Delegation | Ukabidhi | Act of granting authority on one's behalf |
| Trust Topology | Topolojia ya Uaminifu | Graph structure of trust grants |
| Participate | Shiriki | Verb: take part / engage |
| Affiliations | Mahusiano | Cross-community memberships |
| Identities | Vitambulisho | List of known entities at a scope |
| Trust | Uaminifu | Trust state per identity |
| Trust policies | Sera za uaminifu | Policies governing automatic trust |
| Coming Soon | Inakuja Hivi Karibuni | Placeholder for unshipped features |
| Recursive Golden Rule | Kanuni ya Dhahabu ya Kujirudia | Self-applying ethical principle |
| Attestation | Ushuhuda | Signed claim/witness |
| Peer | Mwenza | Per existing network glossary |
| Witness | Shahidi | Behavior witness |

## Version History

- Version | Date | Changes
- 1.0 | 2026-03-27 | Initial glossary
- 1.1 | 2026-05-31 | Added CEG 0.6 cohort scope vocabulary for 2.9.4 Commons UX

---

*This glossary is the authoritative source for Swahili translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | Wavu wa Katiba | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | Uthibitisho wa Manufaa (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | mtandao wa maarifa | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | Ratchet ya Upatanifu | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | Katiba | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | Alama za CIRIS | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | Hoja ya usalama | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Meta-Goal M-1 | Meta-Goal M-1 | The Constitution's top-level goal; M-1 is a label, keep it |
| Constitutional AI | Constitutional AI | Anthropic's training method, a proper name: keep it in English exactly; it is NOT the CIRIS Constitution and the Constitution row does not apply to it |
