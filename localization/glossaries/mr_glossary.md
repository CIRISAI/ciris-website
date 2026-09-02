# CIRIS Marathi Glossary (मराठी)

This glossary defines the canonical translations for key CIRIS terms in Marathi. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Marathi | Transliteration | Usage Context |
|---------|---------|-----------------|---------------|
| OBSERVE | निरीक्षण करा | Nirīkṣaṇ Karā | Gathering information from environment |
| SPEAK | बोला | Bolā | Communicating with users |
| TOOL | साधन | Sādhan | Using external capabilities |
| REJECT | नाकारा | Nākārā | Refusing to perform an action |
| PONDER | विचार करा | Vicār Karā | Deep reflection before deciding |
| DEFER | सोपवा | Sopvā | Referring to Wise Authority |
| MEMORIZE | लक्षात ठेवा | Lakṣāt Ṭhevā | Storing information in memory |
| RECALL | आठवा | Āṭhvā | Retrieving from memory |
| FORGET | विसरा | Visrā | Removing from memory |
| TASK_COMPLETE | कार्य पूर्ण | Kārya Pūrṇ | Signaling task completion |

## Core Concepts

| English | Marathi | Transliteration | Definition |
|---------|---------|-----------------|------------|
| ACCORD | [DEPRECATED] करार | Karār | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | शहाणे प्राधिकरण | Śahāṇe Prādhikaraṇ | Human oversight entity |
| Conscience | विवेक | Vivek | Ethical filter mechanism |
| Principal Hierarchy | मुख्य श्रेणीक्रम | Mukhya Śreṇīkram | Chain of command for guidance |
| Coherence | सुसंगतता | Susaṅgatā | Logical and contextual consistency |
| Epistemic Humility | ज्ञानविषयक नम्रता | Jñānaviṣayak Namratā | Acknowledging knowledge limits |
| Integrity | सचोटी | Sacoṭī | Ethical consistency |
| Resilience | लवचिकता | Lavciktā | Recovery from failures |
| Signalling Gratitude | कृतज्ञता व्यक्त करणे | Kṛtajñatā Vyakt Karṇe | Acknowledging contributions |

## Technical Terms

| English | Marathi | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Agent | एजंट | Ejanṭ | Standard term for agent |
| API | एपीआय | API | Keep in Latin |
| DMA | डीएमए | DMA | Decision-Making Adapter |
| LLM | एलएलएम | LLM | Large Language Model |
| Token | टोकन | Ṭokan | Authentication/LLM context |
| Adapter | अडॅप्टर | Aḍāpṭar | Service extension |
| Service | सेवा | Sevā | System component |
| Pipeline | पाइपलाइन | Pāiplāin | Processing chain |

## Cognitive States

| English | Marathi | Transliteration | Description |
|---------|---------|-----------------|-------------|
| WAKEUP | जागृती | Jāgṛtī | Identity confirmation state |
| WORK | कार्य | Kārya | Normal task processing |
| PLAY | खेळ | Kheḷ | Creative exploration mode |
| SOLITUDE | एकांत | Ekānt | Quiet reflection state |
| DREAM | स्वप्न | Svapna | Deep introspection |
| SHUTDOWN | बंद | Band | Graceful termination |

## UI Labels

| English | Marathi | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Login | लॉगिन | Lŏgin | Enter/Sign in |
| Settings | सेटिंग्ज | Seṭiṅgz | Configuration |
| Messages | संदेश | Sandeś | Communications |
| Send | पाठवा | Pāṭhvā | Transmit |
| Cancel | रद्द करा | Radd Karā | Abort action |
| Confirm | पुष्टी करा | Puṣṭī Karā | Verify |
| Error | त्रुटी | Truṭī | Mistake/failure |
| Warning | इशारा | Iśārā | Alert |
| Success | यश | Yaś | Achievement |
| Loading | लोड होत आहे | Loḍ Hot Āhe | In progress |

## DMA-Specific Terms

| English | Marathi | Used In |
|---------|---------|---------|
| Principal Duties | मुख्य कर्तव्ये | PDMA |
| Common Sense | सामान्य बुद्धी | CSDMA |
| Intuition | अंतर्ज्ञान | IDMA |
| Action Selection | कृती निवड | ASPDMA |
| Domain Specific | क्षेत्र-विशिष्ट | DSDMA |
| Tool Specific | साधन-विशिष्ट | TSASPDMA |

## Pipeline Stages

| English | Marathi | Transliteration | Context |
|---------|---------|-----------------|---------|
| Think | विचार | Vicār | Start thought |
| Context | संदर्भ | Sandarbh | Gather context |
| DMA | निर्णय | Nirṇay | Decision making |
| IDMA | अंतर्ज्ञान तपासणी | Antarjñān Tapāsṇī | Intuition check |
| Select | निवडा | Nivḍā | Action selection |
| Ethics | नैतिकता | Naitikatā | Conscience check |
| Act | कृती | Kṛtī | Execute action |
| Memory Graph | स्मृती आलेख | Smṛtī Ālekh | Knowledge storage |

## Phrases

| English | Marathi |
|---------|---------|
| How can I help you? | मी तुम्हाला कशी मदत करू शकतो? |
| I need to think about this | मला याबद्दल विचार करणे आवश्यक आहे |
| Let me check with Wise Authority | मला शहाण्या प्राधिकरणाशी तपासू द्या |
| This action requires approval | या कृतीसाठी मंजुरी आवश्यक आहे |
| Task completed successfully | कार्य यशस्वीपणे पूर्ण झाले |

## Notes for Translators

1. Marathi uses Devanagari script like Hindi but has distinct vocabulary
2. Maintain formal register (आदरार्थी) for system messages
3. Technical terms (API, DMA, LLM) remain in Latin script
4. Action verbs should use imperative mood (आज्ञार्थी)
5. Preserve placeholders exactly: {action}, {threshold}, {confidence}

## DSASPDMA Deferral Taxonomy Terms

| English | Localized | Notes |
|---------|-----------|-------|
| DSASPDMA | DSASPDMA | Keep acronym in English |
| Deferral-Specific Action Selection | डिफरल-विशिष्ट कृती निवड | DSASPDMA prompt title |
| Rights / Needs Taxonomy | हक्क / गरजा वर्गीकरण | Taxonomy section heading |
| Rights basis | हक्कांचा आधार | Label for treaty-aligned rights basis |
| Operational Deferral Reason | कार्यकारी डिफरल कारण कोड | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## Commons / Cohort-Scope UX (2.9.4)

CEG 0.6 cohort-scope vocabulary used by the new Commons hub.

### Core Concepts (cohort scope)

| English | Marathi | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Cohort scope | कोहोर्ट व्याप्ती (योगदानाची व्याप्ती) | Cohort vyaapti (yogdaanaachi vyaapti) | Technical CIRIS term; keep "cohort scope" recognizable |
| Layer | स्तर | Star | UX surface for one cohort scope |
| Self | स्वतः | Svatah | Reflexive identity; "agent itself" |
| Family | कुटुंब | Kuṭumb | Sibling occurrences sharing operator identity (not nuclear family) |
| Local Community | स्थानिक समुदाय | Sthaanik Samudaay | Locally-trusted peers |
| Global Communities | जागतिक समुदाय | Jaagatik Samudaay | Cross-community affinity groups (plural) |
| Global Commons | जागतिक सामायिक क्षेत्र | Jaagatik Saamaayik Kshetra | Universal federation layer |
| The Commons | सामायिक योगदान | Saamaayik Yogdaan | Federation contribution feed |
| Constitutional | संवैधानिक | Sanvaidhanik | Accord-holder identity surface; federation constitution |
| Delegation | प्रतिनिधीकरण | Pratinidhikaran | Granting authority to act on one's behalf |
| Trust Topology | विश्वास संरचना | Vishvaas Sanrachna | Trust graph |
| Participate | सहभागी व्हा | Sahabhaagi Vhaa | Federation needs registry |
| Affiliations | संलग्नता | Sanlagnataa | Joined communities (CEG term) |

### UI Labels (Commons sections)

| English | Marathi | Notes |
|---------|---------|-------|
| Identities | ओळखी | Plural; list of known entities at a scope |
| Trust | विश्वास | Trust state per identity |
| Trust policies | विश्वास धोरणे | Automatic-trust policies |
| Coming Soon | लवकरच येत आहे | Placeholder for unshipped features |

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | घटनात्मक मेश | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | हिताचा पुरावा (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | ज्ञानाचे जाळे | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | सुसंगतता रॅचेट | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | राज्यघटना | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | CIRIS स्कोअरिंग | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | सुरक्षा प्रकरण | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Constitutional AI | Constitutional AI | Anthropic's training method, a proper name: keep it in English exactly; it is NOT the CIRIS Constitution and the Constitution row does not apply to it |

## Cultural Considerations

### UI labels and review conduct (ciris.ai)
- Keys under `nav.*`, `footer.*`, `lobby.store.*`, and any key ending in `Label`, `Title`, `Btn`, `Cta`, `Head`, `Eyebrow`, `Kicker` or `name` are compact UI labels or headings. Translate them as a noun phrase in this language's own label convention: no leading article unless the language requires one on a label, and the language's own casing for labels.
- Glossary casing is not normative (the glossary block header says so). Capitalization alone is never a finding, at any severity.
- Agreement with this glossary or with the anchors is NOT a finding. Report a terminology finding only when the translation disagrees with them.
- `lobby.store.*` strings are the two lines of an App Store / Google Play badge ("Download on the" + "App Store", "Get it on" + "Google Play"). Judge each line as half of the standard badge wording, never as a sentence.
- When the English source itself says Accord (a historical reference to the document the Constitution replaced), keep the shipped rendering the anchors use. The retired term in the source is not a terminology finding.
