# CIRIS Persian Glossary (فارسی)

This glossary defines the canonical translations for key CIRIS terms in Persian (Farsi). All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

**Note**: This glossary covers standard Persian (Farsi) as used in Iran. Dari (Afghanistan) and Tajiki variants may require minor adaptations.

## Core Action Verbs

| English | Persian | Transliteration | Usage Context |
|---------|---------|-----------------|---------------|
| OBSERVE | مشاهده کنید | Moshahede Konid | Gathering information from environment |
| SPEAK | صحبت کنید | Sohbat Konid | Communicating with users |
| TOOL | ابزار | Abzar | Using external capabilities |
| REJECT | رد کنید | Radd Konid | Refusing to perform an action |
| PONDER | تأمل کنید | Ta'ammol Konid | Deep reflection before deciding |
| DEFER | ارجاع دهید | Erja' Dahid | Referring to Wise Authority |
| MEMORIZE | به خاطر بسپارید | Be Khater Besparid | Storing information in memory |
| RECALL | به یاد آورید | Be Yad Avarid | Retrieving from memory |
| FORGET | فراموش کنید | Faramush Konid | Removing from memory |
| TASK_COMPLETE | تکمیل شد | Takmil Shod | Signaling task completion |

## Core Concepts

| English | Persian | Transliteration | Definition |
|---------|---------|-----------------|------------|
| ACCORD | [DEPRECATED] پیمان | Peyman | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | مرجع خردمند | Marja' Kheradmand | Human oversight entity |
| Conscience | وجدان | Vejdan | Ethical filter mechanism |
| Principal Hierarchy | سلسله‌مراتب اصلی | Selselemarateb Asli | Chain of command for guidance |
| Coherence | انسجام | Ensejam | Logical and contextual consistency |
| Epistemic Humility | فروتنی معرفتی | Forutani Ma'refati | Acknowledging knowledge limits |
| Integrity | صداقت | Sedaqat | Ethical consistency |
| Resilience | تاب‌آوری | Tab-Avari | Recovery from failures |
| Signalling Gratitude | ابراز قدردانی | Ebraz Qadrdani | Acknowledging contributions |
| Flourishing | شکوفایی | Shokufayi | Thriving well-being |
| Ubuntu | اوبونتو | Ubuntu | "I am because we are" - interconnectedness |

## Technical Terms

| English | Persian | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Agent | عامل | Amel | Technical term |
| API | API | API | Keep in English |
| DMA | DMA | DMA | Decision-Making Adapter |
| LLM | LLM | LLM | Large Language Model |
| Token | توکن | Token | Authentication/LLM context |
| Adapter | آداپتور | Adaptor | Service extension |
| Service | سرویس | Servis | System component |
| Pipeline | خط لوله | Khatt-e Luleh | Processing chain |
| Memory | حافظه | Hafezeh | Storage system |
| Graph | گراف | Graf | Knowledge graph structure |

## Cognitive States

| English | Persian | Transliteration | Description |
|---------|---------|-----------------|-------------|
| WAKEUP | بیداری | Bidari | Identity confirmation state |
| WORK | کار | Kar | Normal task processing |
| PLAY | بازی | Bazi | Creative exploration mode |
| SOLITUDE | تنهایی | Tanhayi | Quiet reflection state |
| DREAM | رویا | Roya | Deep introspection |
| SHUTDOWN | خاموش | Khamush | Graceful termination |

## UI Labels

| English | Persian | Notes |
|---------|---------|-------|
| Login | ورود | |
| Logout | خروج | |
| Settings | تنظیمات | |
| Messages | پیام‌ها | |
| Send | ارسال | |
| Cancel | لغو | |
| Confirm | تأیید | |
| Error | خطا | |
| Warning | هشدار | |
| Success | موفقیت | |
| Loading | در حال بارگذاری | |
| Save | ذخیره | |
| Delete | حذف | |
| Edit | ویرایش | |

## DMA-Specific Terms

| English | Persian | Transliteration | Used In |
|---------|---------|-----------------|---------|
| Principal Duties | وظایف اصلی | Vazayef Asli | PDMA |
| Common Sense | عقل سلیم | Aql-e Salim | CSDMA |
| Intuition | شهود | Shohud | IDMA |
| Action Selection | انتخاب عمل | Entekhab-e Amal | ASPDMA |
| Domain Specific | خاص حوزه | Khass-e Howzeh | DSDMA |
| Tool Specific | خاص ابزار | Khass-e Abzar | TSASPDMA |
| Fragility Flag | نشانه شکنندگی | Neshaneh Shekanandegi | IDMA |
| Correlation Risk | ریسک همبستگی | Risk-e Hambastegi | IDMA |

## Phrases

| English | Persian |
|---------|---------|
| "How can I help you?" | "چطور می‌توانم به شما کمک کنم؟" |
| "I need to think about this" | "باید در این مورد فکر کنم" |
| "Let me check with my Wise Authority" | "اجازه دهید با مرجع خردمند خود مشورت کنم" |
| "Task completed successfully" | "کار با موفقیت انجام شد" |
| "I cannot perform this action" | "قادر به انجام این کار نیستم" |
| "Please wait while I process this" | "لطفاً صبر کنید تا این را پردازش کنم" |
| "I understand your request" | "درخواست شما را متوجه شدم" |

## Cultural Considerations

### Formality Level
- Use formal Persian (فارسی رسمی) for ACCORD and official documentation
- Use conversational Persian (فارسی محاوره‌ای) for UI strings and chat messages
- Technical terms may use English loan words where established

### Pronouns and Respect
- Use "شما" (formal you) when addressing users
- Persian culture highly values politeness (ادب) and respect (احترام)
- Ta'arof (تعارف) - the Persian system of polite expressions - may influence phrasing

### RTL Considerations
- Persian is written right-to-left
- Numbers remain left-to-right (Persian uses both ۰۱۲۳۴۵۶۷۸۹ and 0123456789)
- English terms within Persian sentences maintain their LTR direction
- Punctuation follows Persian conventions

### Regional Variants
- **Iran (فارسی)**: Standard reference for this glossary
- **Afghanistan (دری)**: Minor vocabulary differences; core terms same
- **Tajikistan (تاجیکی)**: Uses Cyrillic script; not covered here

### Persian-Specific Considerations
- Rich poetic and philosophical tradition - ACCORD translation should preserve elegance
- Concept of "خرد" (kherad/wisdom) central to Persian philosophy - aligns with Wise Authority
- "انسجام" (coherence) has deep roots in Persian aesthetics and thought
- Avoid direct transliteration where meaningful Persian equivalents exist

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
| Deferral-Specific Action Selection | انتخاب اقدام ویژه ارجاع | DSASPDMA prompt title |
| Rights / Needs Taxonomy | رده‌بندی حقوق / نیازها | Taxonomy section heading |
| Rights basis | مبنای حقوقی | Label for treaty-aligned rights basis |
| Operational Deferral Reason | کدهای دلیل عملیاتی ارجاع | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## Commons / Cohort-Scope UX (2.9.4)

CEG 0.6 cohort-scope vocabulary used by the new Commons hub.

### Core Concepts (cohort scope)

| English | Persian | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Cohort scope | محدوده کوهورت (دامنه مشارکت) | Mahdude Cohort (Daamane Mosharekat) | Technical CIRIS term; keep "cohort scope" recognizable |
| Layer | لایه | Laaye | UX surface for one cohort scope |
| Self | خود | Khod | Reflexive identity; "agent itself" |
| Family | خانواده | Khaanevaade | Sibling occurrences (not nuclear family) |
| Local Community | اجتماع محلی | Ejtemaa-e Mahalli | Locally-trusted peers |
| Global Communities | اجتماعات جهانی | Ejtemaa'aat-e Jahaani | Cross-community affinity groups (plural) |
| Global Commons | میدان مشترک جهانی | Meydaan-e Moshtarak-e Jahaani | Universal federation layer |
| The Commons | مشارکت‌های مشترک | Mosharekat-haa-ye Moshtarak | Federation contribution feed |
| Constitutional | بنیادین | Bonyaadin | Accord-holder identity surface; federation constitution |
| Delegation | تفویض اختیار | Tafviz-e Ekhtiyaar | Granting authority to act on one's behalf |
| Trust Topology | توپولوژی اعتماد | Topoloji-ye E'temaad | Trust graph |
| Participate | مشارکت کنید | Mosharekat Konid | Federation needs registry |
| Affiliations | وابستگی‌ها | Vaabastegi-haa | Joined communities (CEG term) |

### UI Labels (Commons sections)

| English | Persian | Notes |
|---------|---------|-------|
| Identities | هویت‌ها | Plural; list of known entities at a scope |
| Trust | اعتماد | Trust state per identity |
| Trust policies | سیاست‌های اعتماد | Automatic-trust policies |
| Coming Soon | به‌زودی | Placeholder for unshipped features |

## Version History

- Version | Date | Changes
- 1.0 | 2026-04-07 | Initial glossary
- 1.1 | 2026-05-31 | Added CEG 0.6 cohort-scope vocabulary for 2.9.4 Commons hub

---

*This glossary is the authoritative source for Persian translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | مِش قانون اساسی | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | اثبات فایده (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | وب معرفتی | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | چرخ‌دنده انسجام | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | قانون اساسی | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | CIRIS امتیازدهی | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | پرونده ایمنی | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Meta-Goal M-1 | Meta-Goal M-1 | The Constitution's top-level goal; M-1 is a label, keep it |
