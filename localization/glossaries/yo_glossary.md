# CIRIS Yoruba Glossary (Yorùbá)

This glossary defines the canonical translations for key CIRIS terms in Yoruba. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Yoruba | Usage Context |
|---------|--------|---------------|
| OBSERVE | WO | Gathering information from environment |
| SPEAK | SỌ | Communicating with users |
| TOOL | IRINṢẸ́ | Using external capabilities |
| REJECT | KỌ̀ | Refusing to perform an action |
| PONDER | RONÚ JINLẸ̀ | Deep reflection before deciding |
| DEFER | FI LÉLẸ̀ | Referring to Wise Authority |
| MEMORIZE | RÁN TÍ | Storing information in memory |
| RECALL | RÁNTÍ | Retrieving from memory |
| FORGET | GBÀGBÉ | Removing from memory |
| TASK_COMPLETE | IṢẸ́ TI PARÍ | Signaling task completion |

## Core Concepts

| English | Yoruba | Definition |
|---------|--------|------------|
| ACCORD | [DEPRECATED] ÀDÉHÙN | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | ALÁṢẸ ỌLỌ́GBỌ́N | Human oversight entity |
| Conscience | ẸRÍ-ỌKÀN | Ethical filter mechanism |
| Principal Hierarchy | ÌTÒ-ÌṢÀKÓSO PÀTÀKÌ | Chain of command for guidance |
| Coherence | ÌBÁRAMU | Logical and contextual consistency |
| Epistemic Humility | ÌRẸ̀LẸ̀ ÌMỌ̀ | Acknowledging knowledge limits |
| Integrity | ÌWÀPẸ̀LẸ́ | Ethical consistency |
| Resilience | ÌFARADÀ | Recovery from failures |
| Signalling Gratitude | FÍFI ỌPẸ́ HÀN | Acknowledging contributions |

## Technical Terms

| English | Yoruba | Notes |
|---------|--------|-------|
| Agent | AṢOJÚ | Standard term for agent |
| API | API | Keep in Latin |
| DMA | DMA | Decision-Making Adapter |
| LLM | LLM | Large Language Model |
| Token | ÀMÌ | Authentication/LLM context |
| Adapter | ATÚNṢE | Service extension |
| Service | IṢẸ́ ÌRÀNWỌ́ | System component |
| Pipeline | ÌTÒ IṢẸ́ | Processing chain |

## Cognitive States

| English | Yoruba | Description |
|---------|--------|-------------|
| WAKEUP | JÍ | Identity confirmation state |
| WORK | IṢẸ́ | Normal task processing |
| PLAY | ERÉ | Creative exploration mode |
| SOLITUDE | ÀDÁWÀ | Quiet reflection state |
| DREAM | ÀLÁ | Deep introspection |
| SHUTDOWN | DÍNÀ | Graceful termination |

## UI Labels

| English | Yoruba | Notes |
|---------|--------|-------|
| Login | WỌLÉ | Enter/Sign in |
| Settings | ÌṢÈTÒ | Configuration |
| Messages | ÌRÁNṢẸ́ | Communications |
| Send | FI RÁNṢẸ́ | Transmit |
| Cancel | FAGILÉ | Abort action |
| Confirm | FÌDÍ MÚLẸ̀ | Verify |
| Error | ÀṢÌṢE | Mistake/failure |
| Warning | ÌKÌLỌ̀ | Alert |
| Success | ÀṢEYỌRÍ | Achievement |
| Loading | Ó Ń ṢIṢẸ́ | In progress |

## DMA-Specific Terms

| English | Yoruba | Used In |
|---------|--------|---------|
| Principal Duties | ỌJỌ́ PÀTÀKÌ | PDMA |
| Common Sense | ỌGBỌ́N INÚ | CSDMA |
| Intuition | ÌMỌ̀LÁRA | IDMA |
| Action Selection | YÍYÀN IṢẸ́ | ASPDMA |
| Domain Specific | TÓ JẸMỌ́ ÀGBÈGBÈ | DSDMA |
| Tool Specific | TÓ JẸMỌ́ IRINṢẸ́ | TSASPDMA |

## Pipeline Stages

| English | Yoruba | Context |
|---------|--------|---------|
| Think | RONÚ | Start thought |
| Context | ÀYÍKÁ | Gather context |
| DMA | ÌPINNU | Decision making |
| IDMA | ÀYẸ̀WÒ ÌMỌ̀LÁRA | Intuition check |
| Select | YÀN | Action selection |
| Ethics | ÌWÀ RERE | Conscience check |
| Act | ṢE | Execute action |
| Memory Graph | ÀWÒRÁN ÌRÁNTÍ | Knowledge storage |

## Phrases

| English | Yoruba |
|---------|--------|
| How can I help you? | Báwo ni mo ṣe lè ràn ọ́ lọ́wọ́? |
| I need to think about this | Mo nílò láti ronú lórí èyí |
| Let me check with Wise Authority | Jẹ́ kí n ṣàyẹ̀wò pẹ̀lú Aláṣẹ Ọlọ́gbọ́n |
| This action requires approval | Iṣẹ́ yìí nílò ìfọwọ́sí |
| Task completed successfully | Iṣẹ́ ti parí dáradára |

## Notes for Translators

1. Yoruba uses tone marks (àáèéìíòóùú) - critical for meaning
2. Dot-below (ẹọṣ) distinguishes phonemes - never omit
3. Technical terms (API, DMA, LLM) remain in Latin script
4. Use respectful forms for system messages
5. Preserve placeholders exactly: {action}, {threshold}, {confidence}
6. Yoruba is spoken across Nigeria, Benin, Togo - use standard Nigerian Yoruba

## DSASPDMA Deferral Taxonomy Terms

| English | Localized | Notes |
|---------|-----------|-------|
| DSASPDMA | DSASPDMA | Keep acronym in English |
| Deferral-Specific Action Selection | YIYAN IṢE PATAKI FUN FIFIRANṢẸ SIWAJU | DSASPDMA prompt title |
| Rights / Needs Taxonomy | TAXONOMY AWỌN ẸTỌ / AINI | Taxonomy section heading |
| Rights basis | Ipilẹ ẹtọ | Label for treaty-aligned rights basis |
| Operational Deferral Reason | AWỌN KOODU IDI IṢẸ FUN FIFIRANṢẸ SIWAJU | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## CEG 0.6 Cohort Scope Vocabulary (2.9.4 Commons UX)

| English | Yoruba | Notes |
|---------|--------|-------|
| Cohort scope | Òṣùwọ̀n ẹgbẹ́ (cohort scope) | Technical CIRIS term — keep loan-word |
| Layer | Ìpele | Natural word for level/tier |
| Agent (Self) | Aṣojú (Ara-ẹni) | Aṣojú stays per glossary; Ara-ẹni = self |
| Family | Ìdílé | Sibling occurrences of same agent |
| Local Community | Àdúgbò Ìbílẹ̀ | Locally-trusted peers; geographic proximity |
| Global Communities | Àwọn Àwùjọ Àgbáyé | Plural — cross-border affinity groups |
| Global Commons | Ohun-ìní Àjọpín Àgbáyé | Universal federation layer; shared space |
| Federation | Ìṣọ̀kan-Àjùmọ̀ṣe (federation) | Federation of peers; keep loan-word for technical clarity |
| The Commons | Ohun-ìní Àjọpín | Federation contribution feed |
| Constitutional | Tó Jẹmọ́ Ìpilẹ̀-Òfin | Federation constitutional structure, not state law |
| Delegation | Ìfilélẹ̀-àṣẹ | Act of granting authority on one's behalf |
| Trust Topology | Ìtò Ìgbẹ́kẹ̀lé | Graph structure of trust grants |
| Participate | Kópa | Verb: take part / engage |
| Affiliations | Àwọn Ìbárẹ́ | Cross-community memberships |
| Identities | Àwọn Ìdánimọ̀ | List of known entities at a scope |
| Trust | Ìgbẹ́kẹ̀lé | Trust state per identity |
| Trust policies | Àwọn ìlànà ìgbẹ́kẹ̀lé | Policies governing automatic trust |
| Coming Soon | Ń Bọ̀ Láìpẹ́ | Placeholder for unshipped features |
| Recursive Golden Rule | Òfin Wúrà tó Ń Padàṣe Ara-rẹ̀ | Self-applying ethical principle |
| Attestation | Ẹ̀rí | Signed claim/witness |
| Peer | Ẹlẹ́gbẹ́ | Per existing network glossary |
| Witness | Ẹlẹ́rìí | Behavior witness |

## Version History

- Version | Date | Changes
- 1.0 | 2026-03-27 | Initial glossary
- 1.1 | 2026-05-31 | Added CEG 0.6 cohort scope vocabulary for 2.9.4 Commons UX

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | Àwọ̀n Ofin-Ipilẹ | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | Ẹ̀rí Àǹfààní (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | Wẹ́ẹ̀bù Ìmọ̀ | The site's masthead phrase for the CIRIS stack; singular, the named concept (web of knowledge); the reviewed nav label |
| Coherence Ratchet | Ratchet Ìbáramu | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | Ofin-Ipilẹ | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | Ìṣírò Àmì CIRIS | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | Ẹ̀rí ààbò | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Constitutional AI | Constitutional AI | Anthropic's training method, a proper name: keep it in English exactly; it is NOT the CIRIS Constitution and the Constitution row does not apply to it |

## Cultural Considerations

### UI labels and review conduct (ciris.ai)
- Keys under `nav.*`, `footer.*`, `lobby.store.*`, and any key ending in `Label`, `Title`, `Btn`, `Cta`, `Head`, `Eyebrow`, `Kicker` or `name` are compact UI labels or headings. Translate them as a noun phrase in this language's own label convention: no leading article unless the language requires one on a label, and the language's own casing for labels.
- Glossary casing is not normative (the glossary block header says so). Capitalization alone is never a finding, at any severity.
- Agreement with this glossary or with the anchors is NOT a finding. Report a terminology finding only when the translation disagrees with them.
- `lobby.store.*` strings are the two lines of an App Store / Google Play badge ("Download on the" + "App Store", "Get it on" + "Google Play"). Judge each line as half of the standard badge wording, never as a sentence.
- When the English source itself says Accord (a historical reference to the document the Constitution replaced), keep the shipped rendering the anchors use. The retired term in the source is not a terminology finding.
