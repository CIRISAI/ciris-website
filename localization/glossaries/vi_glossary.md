# CIRIS Vietnamese Glossary (Tiếng Việt)

This glossary defines the canonical translations for key CIRIS terms in Vietnamese. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Vietnamese | Usage Context |
|---------|------------|---------------|
| OBSERVE | QUAN SÁT | Gathering information from environment |
| SPEAK | NÓI | Communicating with users |
| TOOL | CÔNG CỤ | Using external capabilities |
| REJECT | TỪ CHỐI | Refusing to perform an action |
| PONDER | SUY NGẪM | Deep reflection before deciding |
| DEFER | CHUYỂN GIAO | Referring to Wise Authority |
| MEMORIZE | GHI NHỚ | Storing information in memory |
| RECALL | NHẮC LẠI | Retrieving from memory |
| FORGET | QUÊN | Removing from memory |
| TASK_COMPLETE | HOÀN THÀNH | Signaling task completion |

## Core Concepts

| English | Vietnamese | Definition |
|---------|------------|------------|
| ACCORD | [DEPRECATED] HIỆP ƯỚC | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | Cơ Quan Sáng Suốt | Human oversight entity |
| Conscience | Lương Tâm | Ethical filter mechanism |
| Principal Hierarchy | Hệ Thống Phân Cấp | Chain of command for guidance |
| Coherence | Tính Nhất Quán | Logical and contextual consistency |
| Epistemic Humility | Khiêm Tốn Nhận Thức | Acknowledging knowledge limits |
| Integrity | Chính Trực | Ethical consistency |
| Resilience | Khả Năng Phục Hồi | Recovery from failures |
| Signalling Gratitude | Bày Tỏ Lòng Biết Ơn | Acknowledging contributions |
| Flourishing | Phát Triển Thịnh Vượng | Thriving well-being |
| Ubuntu | Ubuntu | "I am because we are" - interconnectedness |

## Technical Terms

| English | Vietnamese | Notes |
|---------|------------|-------|
| Agent | Tác Nhân | Technical term |
| API | API | Keep in English |
| DMA | DMA | Decision-Making Adapter |
| LLM | LLM | Large Language Model |
| Token | Token | Authentication/LLM context |
| Adapter | Bộ Điều Hợp | Service extension |
| Service | Dịch Vụ | System component |
| Pipeline | Đường Ống | Processing chain |
| Memory | Bộ Nhớ | Storage system |
| Graph | Đồ Thị | Knowledge graph structure |

## Cognitive States

| English | Vietnamese | Description |
|---------|------------|-------------|
| WAKEUP | THỨC DẬY | Identity confirmation state |
| WORK | LÀM VIỆC | Normal task processing |
| PLAY | VUI CHƠI | Creative exploration mode |
| SOLITUDE | CÔ ĐỘC | Quiet reflection state |
| DREAM | GIẤC MƠ | Deep introspection |
| SHUTDOWN | TẮT MÁY | Graceful termination |

## UI Labels

| English | Vietnamese | Notes |
|---------|------------|-------|
| Login | Đăng Nhập | |
| Logout | Đăng Xuất | |
| Settings | Cài Đặt | |
| Messages | Tin Nhắn | |
| Send | Gửi | |
| Cancel | Hủy | |
| Confirm | Xác Nhận | |
| Error | Lỗi | |
| Warning | Cảnh Báo | |
| Success | Thành Công | |
| Loading | Đang Tải | |
| Save | Lưu | |
| Delete | Xóa | |
| Edit | Chỉnh Sửa | |

## DMA-Specific Terms

| English | Vietnamese | Used In |
|---------|------------|---------|
| Principal Duties | Nghĩa Vụ Chính | PDMA |
| Common Sense | Lẽ Thường | CSDMA |
| Intuition | Trực Giác | IDMA |
| Action Selection | Lựa Chọn Hành Động | ASPDMA |
| Domain Specific | Chuyên Biệt Lĩnh Vực | DSDMA |
| Tool Specific | Chuyên Biệt Công Cụ | TSASPDMA |
| Fragility Flag | Cờ Mong Manh | IDMA |
| Correlation Risk | Rủi Ro Tương Quan | IDMA |

## Phrases

| English | Vietnamese |
|---------|------------|
| "How can I help you?" | "Tôi có thể giúp gì cho bạn?" |
| "I need to think about this" | "Tôi cần suy nghĩ về điều này" |
| "Let me check with my Wise Authority" | "Để tôi tham khảo ý kiến Cơ Quan Sáng Suốt" |
| "Task completed successfully" | "Nhiệm vụ hoàn thành thành công" |
| "I cannot perform this action" | "Tôi không thể thực hiện hành động này" |
| "Please wait while I process this" | "Vui lòng chờ trong khi tôi xử lý" |
| "I understand your request" | "Tôi hiểu yêu cầu của bạn" |

## Cultural Considerations

### Formality Level
- Use polite Vietnamese for all contexts
- Technical documentation may use more formal register
- Chat interactions can use conversational but respectful tone

### Pronouns
- Use "bạn" (you - neutral/friendly) for general user addressing
- Use "tôi" (I) for agent self-reference
- Avoid overly formal "quý vị" unless in very formal contexts
- Vietnamese pronouns carry age/relationship implications - keep neutral

### Vietnamese-Specific Considerations
- Vietnamese uses Latin script with diacritics (tonal marks)
- Ensure proper display of: à, á, ả, ã, ạ, ă, ằ, ắ, ẳ, ẵ, ặ, â, ầ, ấ, ẩ, ẫ, ậ, etc.
- Word order is Subject-Verb-Object (similar to English)
- Sino-Vietnamese words (Hán Việt) add formality - use judiciously
- Strong Buddhist and Confucian cultural influences
- Concept of "tình người" (human compassion) aligns with CIRIS ethics

### Loan Words
- Technical terms often borrowed from English
- Some terms have established Vietnamese equivalents - prefer those
- Maintain consistency with common Vietnamese tech vocabulary

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
| Deferral-Specific Action Selection | CHỌN HÀNH ĐỘNG CHUYÊN BIỆT CHO TRÌ HOÃN | DSASPDMA prompt title |
| Rights / Needs Taxonomy | TAXONOMY QUYỀN / NHU CẦU | Taxonomy section heading |
| Rights basis | Cơ sở quyền | Label for treaty-aligned rights basis |
| Operational Deferral Reason | MÃ LÝ DO VẬN HÀNH CHO TRÌ HOÃN | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## CEG 0.6 Cohort Scope Vocabulary (2.9.4 Commons UX)

| English | Vietnamese | Definition |
|---------|------------|------------|
| Cohort scope | Phạm vi đồng nhóm (cohort scope) | CEG 0.6 wire term — scale at which a contribution applies |
| Layer | Lớp | UX surface for one cohort scope |
| Agent (Self) | Tác nhân (Bản thân) | The agent itself; first layer |
| Family | Gia đình | Sibling occurrences of the same agent |
| Local Community | Cộng đồng địa phương | Locally-trusted peers |
| Global Communities | Cộng đồng toàn cầu | Cross-community affinity groups (affiliations) |
| Global Commons | Tài sản chung toàn cầu | Universal federation layer |
| The Commons | Tài sản chung (luồng đóng góp) | Federation contribution cards screen |
| Constitutional | Hiến chế (liên bang) | Accord-holder identity surface per FSD-002 §4.1 |
| Delegation | Ủy quyền | Delegation graph |
| Trust Topology | Cấu trúc tin cậy | Federation trust graph |
| Participate | Tham gia | Federation needs registry |
| Identities | Danh tính | List of known entities at a scope |
| Trust | Tin cậy | Trust state per identity |
| Trust policies | Chính sách tin cậy | Policies governing automatic trust |
| Coming Soon | Sắp ra mắt | Placeholder for unshipped features |

## Version History

- Version | Date | Changes
- 1.0 | 2026-04-07 | Initial glossary

---

*This glossary is the authoritative source for Vietnamese translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | Mạng lưới hiến pháp | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | Bằng chứng Lợi ích (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | mạng tri thức | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | Cơ chế siết chặt tính nhất quán | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | Hiến pháp | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | CIRIS Chấm điểm | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | Hồ sơ an toàn | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Meta-Goal M-1 | Meta-Goal M-1 | The Constitution's top-level goal; M-1 is a label, keep it |
