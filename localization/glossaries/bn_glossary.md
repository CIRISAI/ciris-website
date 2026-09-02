# CIRIS Bengali Glossary (বাংলা)

This glossary defines the canonical translations for key CIRIS terms in Bengali. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Bengali | Transliteration | Usage Context |
|---------|---------|-----------------|---------------|
| OBSERVE | পর্যবেক্ষণ করুন | Porjobekkhon korun | Gathering information from environment |
| SPEAK | বলুন | Bolun | Communicating with users |
| TOOL | সরঞ্জাম | Soronjam | Using external capabilities |
| REJECT | প্রত্যাখ্যান করুন | Protyakhyan korun | Refusing to perform an action |
| PONDER | চিন্তা করুন | Chinta korun | Deep reflection before deciding |
| DEFER | স্থগিত করুন | Sthogit korun | Referring to Wise Authority |
| MEMORIZE | মনে রাখুন | Mone rakhun | Storing information in memory |
| RECALL | স্মরণ করুন | Smoron korun | Retrieving from memory |
| FORGET | ভুলে যান | Bhule jan | Removing from memory |
| TASK_COMPLETE | কাজ সম্পূর্ণ | Kaj sompurno | Signaling task completion |

## Core Concepts

| English | Bengali | Transliteration | Definition |
|---------|---------|-----------------|------------|
| ACCORD | [DEPRECATED] চুক্তি | Chukti | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | জ্ঞানী কর্তৃপক্ষ | Gyani kortripokko | Human oversight entity |
| Conscience | বিবেক | Bibek | Ethical filter mechanism |
| Principal Hierarchy | প্রধান শ্রেণিবিন্যাস | Prodhan shrenibinyas | Chain of command for guidance |
| Coherence | সামঞ্জস্য | Samonjosyo | Logical and contextual consistency |
| Epistemic Humility | জ্ঞানতাত্ত্বিক বিনয় | Gyanotattik binoy | Acknowledging knowledge limits |
| Integrity | সততা | Sotota | Ethical consistency |
| Resilience | স্থিতিস্থাপকতা | Sthitisthapokota | Recovery from failures |
| Signalling Gratitude | কৃতজ্ঞতা প্রকাশ | Kritoggyota prokash | Acknowledging contributions |

## Technical Terms

| English | Bengali | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Agent | এজেন্ট | Agent | Keep as-is |
| API | API | API | Keep in English |
| DMA | DMA | DMA | Decision-Making Adapter |
| LLM | LLM | LLM | Large Language Model |
| Token | টোকেন | Token | Authentication/LLM context |
| Adapter | অ্যাডাপ্টার | Adapter | Service extension |
| Service | সেবা | Seba | System component |
| Pipeline | পাইপলাইন | Pipeline | Processing chain |

## Cognitive States

| English | Bengali | Transliteration | Description |
|---------|---------|-----------------|-------------|
| WAKEUP | জাগরণ | Jagoron | Identity confirmation state |
| WORK | কাজ | Kaj | Normal task processing |
| PLAY | খেলা | Khela | Creative exploration mode |
| SOLITUDE | একাকীত্ব | Ekakitto | Quiet reflection state |
| DREAM | স্বপ্ন | Shopno | Deep introspection |
| SHUTDOWN | বন্ধ | Bondho | Graceful termination |

## UI Labels

| English | Bengali | Notes |
|---------|---------|-------|
| Login | লগইন | |
| Settings | সেটিংস | |
| Messages | বার্তা | |
| Send | পাঠান | |
| Cancel | বাতিল | |
| Confirm | নিশ্চিত করুন | |
| Error | ত্রুটি | |
| Warning | সতর্কতা | |
| Success | সফল | |
| Loading | লোড হচ্ছে | |

## DMA-Specific Terms

| English | Bengali | Used In |
|---------|---------|---------|
| Principal Duties | প্রধান কর্তব্য | PDMA |
| Common Sense | সাধারণ জ্ঞান | CSDMA |
| Intuition | অন্তর্দৃষ্টি | IDMA |
| Action Selection | কর্ম নির্বাচন | ASPDMA |
| Domain Specific | ডোমেইন নির্দিষ্ট | DSDMA |
| Tool Specific | সরঞ্জাম নির্দিষ্ট | TSASPDMA |

## Phrases

| English | Bengali |
|---------|---------|
| "How can I help you?" | "আমি কিভাবে আপনাকে সাহায্য করতে পারি?" |
| "I need to think about this" | "এই বিষয়ে আমাকে ভাবতে হবে" |
| "Let me check with my Wise Authority" | "আমাকে আমার জ্ঞানী কর্তৃপক্ষের সাথে যাচাই করতে দিন" |
| "Task completed successfully" | "কাজ সফলভাবে সম্পন্ন হয়েছে" |
| "I cannot perform this action" | "আমি এই কাজটি করতে পারছি না" |

## Cultural Considerations

### Formality Level
Bengali uses formal register (আপনি/Apni) for polite/formal contexts. CIRIS should use this formal register in all communications to maintain professional respect.

### Honorifics
Bengali has T-V distinction (তুমি vs আপনি). Always use আপনি (formal "you") when addressing users.

### Script/Direction
Bengali uses the Bengali script (বাংলা লিপি), which is written left-to-right. Numbers typically use Bengali numerals (০১২৩৪৫৬৭৮৯) or Western Arabic numerals (0123456789) - Western numerals are acceptable in technical contexts.

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
| Deferral-Specific Action Selection | ডিফারাল-নির্দিষ্ট কর্ম নির্বাচন | DSASPDMA prompt title |
| Rights / Needs Taxonomy | অধিকার / প্রয়োজনের শ্রেণিবিন্যাস | Taxonomy section heading |
| Rights basis | অধিকারের ভিত্তি | Label for treaty-aligned rights basis |
| Operational Deferral Reason | কার্যগত ডিফারাল কারণ কোড | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## Commons / Cohort-Scope UX (2.9.4)

CEG 0.6 cohort-scope vocabulary used by the new Commons hub.

### Core Concepts (cohort scope)

| English | Bengali | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Cohort scope | কোহোর্ট পরিসর (অবদানের পরিধি) | Cohort poriśor (obodaaner poridhi) | Technical CIRIS term; keep "cohort scope" recognizable |
| Layer | স্তর | Stor | UX surface for one cohort scope |
| Self | স্বয়ং | Swayong | Reflexive identity; "agent itself" |
| Family | পরিবার | Poribar | Sibling occurrences (not nuclear family) |
| Local Community | স্থানীয় সম্প্রদায় | Sthaaniyo Somprodaay | Locally-trusted peers |
| Global Communities | বৈশ্বিক সম্প্রদায়সমূহ | Boishik Somprodaay-somuho | Cross-community affinity groups (plural) |
| Global Commons | বৈশ্বিক যৌথ ক্ষেত্র | Boishik Joutho Kshetro | Universal federation layer |
| The Commons | যৌথ অবদান | Joutho Obodaan | Federation contribution feed |
| Constitutional | সাংবিধানিক | Saangbidhaanik | Accord-holder identity surface; federation constitution |
| Delegation | অর্পণ | Orpon | Granting authority to act on one's behalf |
| Trust Topology | বিশ্বাস কাঠামো | Bishwaas Kathaamo | Trust graph |
| Participate | অংশগ্রহণ করুন | Ongshogrohon korun | Federation needs registry |
| Affiliations | অধিভুক্তি | Odhibhukti | Joined communities (CEG term) |

### UI Labels (Commons sections)

| English | Bengali | Notes |
|---------|---------|-------|
| Identities | পরিচয়সমূহ | Plural; list of known entities at a scope |
| Trust | বিশ্বাস | Trust state per identity |
| Trust policies | বিশ্বাস নীতি | Automatic-trust policies |
| Coming Soon | শীঘ্রই আসছে | Placeholder for unshipped features |

## Version History

- Version | Date | Changes
- 1.0 | 2026-04-07 | Initial glossary
- 1.1 | 2026-05-31 | Added CEG 0.6 cohort-scope vocabulary for 2.9.4 Commons hub

---

*This glossary is the authoritative source for Bengali translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | সাংবিধানিক মেশ | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | উপকারের প্রমাণ (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | জ্ঞানের জাল | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | সামঞ্জস্য র‍্যাচেট | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | সংবিধান | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | CIRIS স্কোরিং | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | নিরাপত্তার কেস | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
