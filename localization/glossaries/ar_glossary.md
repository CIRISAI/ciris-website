# CIRIS Arabic Glossary (العربية)

This glossary defines the canonical translations for key CIRIS terms in Arabic. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Arabic | Transliteration | Usage Context |
|---------|--------|-----------------|---------------|
| OBSERVE | مراقبة | Muraqaba | Gathering information from environment |
| SPEAK | تحدث | Tahadduth | Communicating with users |
| TOOL | أداة | Adah | Using external capabilities |
| REJECT | رفض | Rafd | Refusing to perform an action |
| PONDER | تأمل | Ta'ammul | Deep reflection before deciding |
| DEFER | تأجيل | Ta'jeel | Referring to Wise Authority |
| MEMORIZE | حفظ | Hifz | Storing information in memory |
| RECALL | استذكار | Istidhkar | Retrieving from memory |
| FORGET | نسيان | Nisyan | Removing from memory |
| TASK_COMPLETE | اكتملت المهمة | Iktamalat al-Muhimmah | Signaling task completion |

## Core Concepts

| English | Arabic | Transliteration | Definition |
|---------|--------|-----------------|------------|
| ACCORD | [DEPRECATED] عہد نامہ | Ahd Namah | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | السلطة الحكيمة | As-Sultah al-Hakimah | Human oversight entity |
| Conscience | الضمير | Ad-Damir | Ethical filter mechanism |
| Principal Hierarchy | التسلسل الهرمي للمبادئ | At-Tasalsul al-Harami lil-Mabadi' | Chain of command for guidance |
| Coherence | التماسك | At-Tamasuk | Logical and contextual consistency |
| Epistemic Humility | التواضع المعرفي | At-Tawadu' al-Ma'rifi | Acknowledging knowledge limits |
| Integrity | النزاهة | An-Nazahah | Ethical consistency |
| Resilience | المرونة | Al-Marunah | Recovery from failures |
| Signalling Gratitude | إظهار الامتنان | Izhar al-Imtinan | Acknowledging contributions |

## Technical Terms

| English | Arabic | Transliteration | Notes |
|---------|--------|-----------------|-------|
| Agent | وكيل | Wakil | AI agent/representative |
| API | API | API | Keep in English |
| DMA | DMA | DMA | Decision-Making Adapter |
| LLM | LLM | LLM | Large Language Model |
| Token | رمز | Ramz | Authentication/LLM context |
| Adapter | محول | Muhawwil | Service extension |
| Service | خدمة | Khidmah | System component |
| Pipeline | خط أنابيب | Khatt Anabib | Processing chain |

## Cognitive States

| English | Arabic | Transliteration | Description |
|---------|--------|-----------------|-------------|
| WAKEUP | استيقاظ | Istiqadh | Identity confirmation state |
| WORK | عمل | 'Amal | Normal task processing |
| PLAY | لعب | La'ib | Creative exploration mode |
| SOLITUDE | عزلة | 'Uzlah | Quiet reflection state |
| DREAM | حلم | Hilm | Deep introspection |
| SHUTDOWN | إيقاف | Iqaf | Graceful termination |

## UI Labels

| English | Arabic | Notes |
|---------|--------|-------|
| Login | تسجيل الدخول | |
| Settings | الإعدادات | |
| Messages | الرسائل | |
| Send | إرسال | |
| Cancel | إلغاء | |
| Confirm | تأكيد | |
| Error | خطأ | |
| Warning | تحذير | |
| Success | نجاح | |
| Loading | جارٍ التحميل | |

## DMA-Specific Terms

| English | Arabic | Used In |
|---------|--------|---------|
| Principal Duties | الواجبات الأساسية | PDMA |
| Common Sense | الحس السليم | CSDMA |
| Intuition | الحدس | IDMA |
| Action Selection | اختيار الإجراء | ASPDMA |
| Domain Specific | خاص بالمجال | DSDMA |
| Tool Specific | خاص بالأداة | TSASPDMA |

## Processing States

| English | Arabic |
|---------|--------|
| "Processing..." | "جارٍ المعالجة..." |
| "Thinking..." | "جارٍ التفكير..." |
| "Speaking..." | "جارٍ التحدث..." |
| "Memorizing..." | "الحفظ في الذاكرة..." |
| "Recalling..." | "جارٍ الاستذكار..." |
| "Using tool..." | "استخدام الأداة..." |
| "Pondering..." | "جارٍ التأمل..." |
| "Gathering context..." | "جمع السياق..." |
| "Evaluating..." | "جارٍ التقييم..." |
| "Selecting action" | "اختيار الإجراء" |

## Phrases

| English | Arabic |
|---------|--------|
| "How can I help you today?" | "كيف يمكنني مساعدتك اليوم؟" |
| "I need to think about this" | "دعني أفكر في ذلك..." |
| "I need to consult a human advisor" | "أحتاج إلى استشارة مستشار بشري في هذا الأمر. سأعود إليك." |
| "Task completed successfully" | "اكتملت المهمة بنجاح." |
| "I don't have permission to do that" | "ليس لدي إذن للقيام بذلك." |
| "Can you clarify what you mean?" | "هل يمكنك توضيح ما تقصد؟" |
| "All systems operational" | "جميع الأنظمة تعمل" |
| "Waiting for agent..." | "في انتظار الوكيل..." |

## H3ERE Pipeline Terms

| English | Arabic |
|---------|--------|
| "Start thinking" | "بدء التفكير" |
| "Gather context" | "جمع السياق" |
| "Decision-making" | "صنع القرار" |
| "Intuition check" | "فحص الحدس" |
| "Action selection" | "اختيار الإجراء" |
| "Ethics check" | "فحص الأخلاق" |
| "Execute action" | "تنفيذ الإجراء" |
| "Memory graph" | "رسم الذاكرة" |

## Cultural Considerations

### Formality Level
- Use formal Modern Standard Arabic (الفصحى الحديثة) for ACCORD and official documentation
- Use conversational Arabic for UI strings and chat messages
- Technical terms may remain in English when widely understood (API, LLM, DMA)

### Honorifics
- When addressing users, use formal register
- For Wise Authority references, use respectful terminology (السلطة الحكيمة)
- Maintain professional tone in all communications

### RTL Considerations
- Arabic is written right-to-left (RTL)
- Numbers remain left-to-right (LTR)
- English terms within Arabic sentences maintain their direction
- Punctuation follows Arabic conventions
- UI layouts must accommodate RTL flow
- Text alignment should be right-aligned for Arabic content

### Script and Typography
- Use clear, legible Arabic fonts suitable for digital interfaces
- Ensure proper diacritical mark handling when needed
- Consider letter connecting forms (initial, medial, final, isolated)

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
| Deferral-Specific Action Selection | اختيار الإجراء الخاص بالإحالة | DSASPDMA prompt title |
| Rights / Needs Taxonomy | تصنيف الحقوق / الاحتياجات | Taxonomy section heading |
| Rights basis | أساس الحقوق | Label for treaty-aligned rights basis |
| Operational Deferral Reason | رموز سبب الإحالة التشغيلية | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## CEG 0.6 Cohort-Scope Vocabulary (2.9.4 Commons hub)

| English | Arabic | Transliteration | Definition / Guidance |
|---------|--------|-----------------|------------------------|
| Cohort scope | نطاق المجموعة (cohort scope) | Niṭāq al-Majmū'ah | CEG 0.6 wire-format term; keep English in parentheses when used in technical text |
| Layer | طبقة | Ṭabaqah | UX surface for one cohort scope |
| Self | الذات | Adh-Dhāt | Reflexive "self" referring to the agent itself |
| Family | العائلة | Al-'Ā'ilah | Sibling occurrences of the same agent — not nuclear-family connotation |
| Local Community | المجتمع المحلي | Al-Mujtama' al-Maḥalliy | Locally-trusted peers — home channel, household, single guild |
| Global Communities | المجتمعات العالمية | Al-Mujtama'āt al-'Ālamiyyah | Cross-community affinity groups (CEG: affiliations) |
| Global Commons | المشاع العالمي | Al-Mushā' al-'Ālamiy | The universal federation layer (species + planet + federation) |
| The Commons | المشاع | Al-Mushā' | Federation contribution-cards screen — distinct from "Global Commons" the layer |
| Constitutional | الدستوري | Ad-Dustūriy | Accord-holder identity surface (FSD-002 §4.1) — refers to federation constitutional structure |
| Delegation | التفويض | At-Tafwīḍ | Granting authority/scope to act on one's behalf |
| Trust Topology | طوبولوجيا الثقة | Ṭūbūlūjiyā ath-Thiqah | Federation trust graph — peers as nodes, trust grants as edges |
| Participate | المشاركة | Al-Mushārakah | Federation needs registry — verb form: take part / contribute |
| Affiliations | الانتسابات | Al-Intisābāt | Cross-community memberships (CEG term for global-communities cohort) |
| Identities | الهويات | Al-Huwiyyāt | Known entities at a scope, with friendly names where available |
| Trust | الثقة | Ath-Thiqah | Trust state per identity |
| Trust policies | سياسات الثقة | Siyāsāt ath-Thiqah | Policies governing automatic trust at a scope |
| Coming Soon | قريباً | Qarīban | Placeholder for unshipped features |

## Version History

- Version | Date | Changes
- 1.0 | 2026-03-27 | Initial glossary extracted from ar.json
- 1.1 | 2026-05-31 | Added CEG 0.6 cohort-scope vocabulary for 2.9.4 Commons hub

---

*This glossary is the authoritative source for Arabic translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | الشبكة الدستورية | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | إثبات النفع (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | الشبكة المعرفية | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | رافعة التماسك | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | الدستور | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | تقييم CIRIS | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | حالة السلامة | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Meta-Goal M-1 | Meta-Goal M-1 | The Constitution's top-level goal; M-1 is a label, keep it |
