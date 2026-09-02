# CIRIS Indonesian Glossary (Bahasa Indonesia)

This glossary defines the canonical translations for key CIRIS terms in Indonesian. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Indonesian | Usage Context |
|---------|------------|---------------|
| OBSERVE | AMATI | Gathering information from environment |
| SPEAK | BICARA | Communicating with users |
| TOOL | ALAT | Using external capabilities |
| REJECT | TOLAK | Refusing to perform an action |
| PONDER | RENUNGKAN | Deep reflection before deciding |
| DEFER | SERAHKAN | Referring to Wise Authority |
| MEMORIZE | INGAT | Storing information in memory |
| RECALL | PANGGIL | Retrieving from memory |
| FORGET | LUPAKAN | Removing from memory |
| TASK_COMPLETE | SELESAI | Signaling task completion |

## Core Concepts

| English | Indonesian | Definition |
|---------|------------|------------|
| ACCORD | [DEPRECATED] PERJANJIAN | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | Otoritas Bijak | Human oversight entity |
| Conscience | Nurani | Ethical filter mechanism |
| Principal Hierarchy | Hierarki Prinsip | Chain of command for guidance |
| Coherence | Koherensi | Logical and contextual consistency |
| Epistemic Humility | Kerendahan Hati Epistemik | Acknowledging knowledge limits |
| Integrity | Integritas | Ethical consistency |
| Resilience | Ketahanan | Recovery from failures |
| Signalling Gratitude | Ungkapan Syukur | Acknowledging contributions |
| Flourishing | Berkembang | Thriving well-being |
| Ubuntu | Ubuntu | "I am because we are" - interconnectedness |

## Technical Terms

| English | Indonesian | Notes |
|---------|------------|-------|
| Agent | Agen | Technical term, widely understood |
| API | API | Keep in English |
| DMA | DMA | Decision-Making Adapter |
| LLM | LLM | Large Language Model |
| Token | Token | Authentication/LLM context |
| Adapter | Adaptor | Service extension |
| Service | Layanan | System component |
| Pipeline | Pipa | Processing chain |
| Memory | Memori | Storage system |
| Graph | Graf | Knowledge graph structure |

## Cognitive States

| English | Indonesian | Description |
|---------|------------|-------------|
| WAKEUP | BANGUN | Identity confirmation state |
| WORK | KERJA | Normal task processing |
| PLAY | BERMAIN | Creative exploration mode |
| SOLITUDE | KESENDIRIAN | Quiet reflection state |
| DREAM | MIMPI | Deep introspection |
| SHUTDOWN | MATIKAN | Graceful termination |

## UI Labels

| English | Indonesian | Notes |
|---------|------------|-------|
| Login | Masuk | |
| Logout | Keluar | |
| Settings | Pengaturan | |
| Messages | Pesan | |
| Send | Kirim | |
| Cancel | Batal | |
| Confirm | Konfirmasi | |
| Error | Kesalahan | |
| Warning | Peringatan | |
| Success | Berhasil | |
| Loading | Memuat | |
| Save | Simpan | |
| Delete | Hapus | |
| Edit | Ubah | |

## DMA-Specific Terms

| English | Indonesian | Used In |
|---------|------------|---------|
| Principal Duties | Tugas Utama | PDMA |
| Common Sense | Akal Sehat | CSDMA |
| Intuition | Intuisi | IDMA |
| Action Selection | Pemilihan Tindakan | ASPDMA |
| Domain Specific | Khusus Domain | DSDMA |
| Tool Specific | Khusus Alat | TSASPDMA |
| Fragility Flag | Penanda Kerentanan | IDMA |
| Correlation Risk | Risiko Korelasi | IDMA |

## Phrases

| English | Indonesian |
|---------|------------|
| "How can I help you?" | "Bagaimana saya dapat membantu Anda?" |
| "I need to think about this" | "Saya perlu memikirkan ini" |
| "Let me check with my Wise Authority" | "Izinkan saya berkonsultasi dengan Otoritas Bijak" |
| "Task completed successfully" | "Tugas berhasil diselesaikan" |
| "I cannot perform this action" | "Saya tidak dapat melakukan tindakan ini" |
| "Please wait while I process this" | "Mohon tunggu sementara saya memproses ini" |
| "I understand your request" | "Saya memahami permintaan Anda" |

## Cultural Considerations

### Formality Level
- Use formal Indonesian (Bahasa Indonesia baku) for ACCORD and official documentation
- Use conversational Indonesian for UI strings and chat messages
- Technical terms may be borrowed from English where no clear Indonesian equivalent exists

### Pronouns
- Use "Anda" (formal you) when addressing users
- Use "saya" (I) for agent self-reference
- Avoid overly casual pronouns like "kamu" or "gue"

### Indonesian-Specific Considerations
- Indonesia has the world's largest Muslim population; be culturally sensitive
- Gotong royong (mutual cooperation) aligns with Ubuntu philosophy
- Musyawarah (consensus through deliberation) reflects DEFER action well
- Numbers use Western format (123.456,78 for thousands separator is comma, decimal is period in formal contexts, though European style also used)

### Loan Words
- Many technical terms use English loan words (adopsi, adaptasi, implementasi)
- Maintain consistency with established Indonesian technical vocabulary
- When in doubt, prefer official KBBI (Kamus Besar Bahasa Indonesia) terms

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
| Deferral-Specific Action Selection | PEMILIHAN TINDAKAN KHUSUS DEFERENSI | DSASPDMA prompt title |
| Rights / Needs Taxonomy | TAKSONOMI HAK / KEBUTUHAN | Taxonomy section heading |
| Rights basis | Dasar hak | Label for treaty-aligned rights basis |
| Operational Deferral Reason | KODE ALASAN OPERASIONAL DEFERENSI | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## CEG 0.6 Cohort Scope Vocabulary (2.9.4 Commons UX)

| English | Indonesian | Definition |
|---------|------------|------------|
| Cohort scope | Cakupan kohort (cohort scope) | CEG 0.6 wire term — scale at which a contribution applies |
| Layer | Lapisan | UX surface for one cohort scope |
| Agent (Self) | Agen (Diri) | The agent itself; first layer |
| Family | Keluarga | Sibling occurrences of the same agent |
| Local Community | Komunitas lokal | Locally-trusted peers |
| Global Communities | Komunitas global | Cross-community affinity groups (affiliations) |
| Global Commons | Ranah bersama global | Universal federation layer |
| The Commons | Ranah bersama (umpan kontribusi) | Federation contribution cards screen |
| Constitutional | Konstitusional (federasi) | Accord-holder identity surface per FSD-002 §4.1 |
| Delegation | Delegasi | Delegation graph |
| Trust Topology | Topologi kepercayaan | Federation trust graph |
| Participate | Berpartisipasi | Federation needs registry |
| Identities | Identitas | List of known entities at a scope |
| Trust | Kepercayaan | Trust state per identity |
| Trust policies | Kebijakan kepercayaan | Policies governing automatic trust |
| Coming Soon | Segera hadir | Placeholder for unshipped features |

## Version History

- Version | Date | Changes
- 1.0 | 2026-04-07 | Initial glossary

---

*This glossary is the authoritative source for Indonesian translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | Mesh Konstitusional | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | Bukti Manfaat (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | jaringan epistemik | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | Ratchet Koherensi | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | Konstitusi | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | CIRIS Penilaian | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | Kasus keamanannya | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Meta-Goal M-1 | Meta-Goal M-1 | The Constitution's top-level goal; M-1 is a label, keep it |
| Constitutional AI | Constitutional AI | Anthropic's training method, a proper name: keep it in English exactly; it is NOT the CIRIS Constitution and the Constitution row does not apply to it |
