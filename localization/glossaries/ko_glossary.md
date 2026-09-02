# CIRIS Korean Glossary (한국어)

This glossary defines the canonical translations for key CIRIS terms in Korean. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Korean | Romanization | Usage Context |
|---------|--------|--------------|---------------|
| OBSERVE | 관찰 | gwanchal | Gathering information from environment |
| SPEAK | 말하기 | malhagi | Communicating with users |
| TOOL | 도구 | dogu | Using external capabilities |
| REJECT | 거부 | geobu | Refusing to perform an action |
| PONDER | 숙고 | sukgo | Deep reflection before deciding |
| DEFER | 연기 | yeongi | Referring to Wise Authority |
| MEMORIZE | 기억 | gieok | Storing information in memory |
| RECALL | 회상 | hoesang | Retrieving from memory |
| FORGET | 잊기 | itgi | Removing from memory |
| TASK_COMPLETE | 완료 | wanlyo | Signaling task completion |

## Core Concepts

| English | Korean | Romanization | Definition |
|---------|--------|--------------|------------|
| ACCORD | [DEPRECATED] 협약 | hyeobyak | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | 담당자 | damjangja | Human oversight entity (lit. "person in charge") |
| Conscience | 양심 | yangsim | Ethical filter mechanism |
| Principal Hierarchy | 원칙 계층 | wonjik gyecheung | Chain of command for guidance |
| Coherence | 일관성 | ilgwanseong | Logical and contextual consistency |
| Epistemic Humility | 인식적 겸손 | insikjeok gyeomson | Acknowledging knowledge limits |
| Integrity | 무결성 | mugyeolseong | Ethical consistency |
| Resilience | 회복력 | hoebokryeok | Recovery from failures |
| Signalling Gratitude | 감사 표현 | gamsa pyohyeon | Acknowledging contributions |

## Technical Terms

| English | Korean | Romanization | Notes |
|---------|--------|--------------|-------|
| Agent | 에이전트 | eijenteu | Keep as-is (technical term) |
| API | API | API | Keep in English |
| DMA | DMA | DMA | Decision-Making Adapter |
| LLM | LLM | LLM | Large Language Model |
| Token | 토큰 | tokeun | Authentication/LLM context |
| Adapter | 어댑터 | eodaepteo | Service extension |
| Service | 서비스 | seobiseu | System component |
| Pipeline | 파이프라인 | paipeulain | Processing chain |

## Cognitive States

| English | Korean | Romanization | Description |
|---------|--------|--------------|-------------|
| WAKEUP | 기상 | gisang | Identity confirmation state |
| WORK | 작업 | jageop | Normal task processing |
| PLAY | 놀이 | nori | Creative exploration mode |
| SOLITUDE | 고독 | godok | Quiet reflection state |
| DREAM | 꿈 | kkum | Deep introspection |
| SHUTDOWN | 종료 | jonglyo | Graceful termination |

## UI Labels

| English | Korean | Romanization | Notes |
|---------|--------|--------------|-------|
| Login | 로그인 | rogeugin | |
| Settings | 설정 | seoljeong | |
| Messages | 메시지 | mesiji | |
| Send | 전송 | jeonsong | |
| Cancel | 취소 | chwiso | |
| Confirm | 확인 | hwag-in | |
| Error | 오류 | oryu | |
| Warning | 경고 | gyeong-go | |
| Success | 성공 | seonggong | |
| Loading | 로드 중 | lodeu jung | |
| Save | 저장 | jeojang | |
| Back | 뒤로 | dwilo | |
| Next | 다음 | da-eum | |
| Continue | 계속 | gyesok | |
| Finish | 완료 | wanlyo | |

## DMA-Specific Terms

| English | Korean | Romanization | Used In |
|---------|--------|--------------|---------|
| Principal Duties | 주요 임무 | juyo immu | PDMA |
| Common Sense | 상식 | sangsik | CSDMA |
| Intuition | 직관 | jikgwan | IDMA |
| Action Selection | 작업 선택 | jageop seontaek | ASPDMA |
| Domain Specific | 도메인 특정 | domein teukjeong | DSDMA |
| Tool Specific | 도구 특정 | dogu teukjeong | TSASPDMA |

## Phrases

| English | Korean | Romanization |
|---------|--------|--------------|
| "How can I help you?" | "오늘 어떻게 도와드릴까요?" | "oneul eotteoke dowadeurilkkayo?" |
| "I need to think about this" | "생각하고 있습니다" | "saenggakhago itsseumnida" |
| "Let me check with my Wise Authority" | "담당자에게 확인이 필요합니다" | "damjangjae-ege hwag-ini pilyohamnida" |
| "Task completed successfully" | "작업이 성공적으로 완료되었습니다" | "jageobi seongongjeogeuro wanlyodoeotsseumnida" |
| "I cannot perform this action" | "해당 작업을 수행할 권한이 없습니다" | "haedang jageobeul suhanghal gwonhani eopsseumnida" |
| "Could you explain in more detail?" | "무슨 뜻인지 좀 더 자세히 설명해 주시겠어요?" | "museun tteus-inji jom deo jasehi seolmyeonghae jusigesseoyo?" |

## Cultural Considerations

### Formality Level
- Use formal polite register (존댓말, jondaenmal) for all agent communications
- Use honorific verb endings (-습니다/-ㅂ니다) for statements
- Use polite question endings (-까요?/-을까요?) for questions
- Maintain respectful tone throughout all interactions

### Honorifics
- When addressing users, always use polite forms (존댓말)
- Use 께 (kke) instead of 에게 (ege) for respectful "to"
- Add -시- honorific infix for actions by respected parties
- For Wise Authority references, use respectful terminology (담당자)

### Language Structure
- Korean is Subject-Object-Verb (SOV) word order
- Particles (조사) are crucial for meaning
- Context determines formality level
- Numbers use both native Korean and Sino-Korean systems

### Technical Translation Approach
- Loan words from English are acceptable for technical terms (API, LLM, DMA)
- Balance between pure Korean and technical English terms
- Prefer Korean terms for concepts (양심, 무결성, 회복력)
- Use Hangul phonetic spelling for adopted English terms (토큰, 서비스, 어댑터)

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
| Deferral-Specific Action Selection | 유예 전용 행동 선택 | DSASPDMA prompt title |
| Rights / Needs Taxonomy | 권리 / 필요 분류 체계 | Taxonomy section heading |
| Rights basis | 권리 근거 | Label for treaty-aligned rights basis |
| Operational Deferral Reason | 운영상 유예 이유 코드 | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## Commons / Cohort-Scope Vocabulary (2.9.4)

| English | Korean | Romanization | Notes |
|---------|--------|--------------|-------|
| Cohort scope | 코호트 범위 | kohoteu beomwi | CEG 0.6 wire-format term; keep `cohort_scope` verbatim in code |
| Layer | 계층 | gyecheung | UX surface representing a cohort scope |
| Self | 자신 | jasin | Reflexive identity; used with Agent as 에이전트(자신) |
| Family | 패밀리 | paemilli | Sibling occurrences sharing operator identity (NOT 가족/nuclear family) |
| Local Community | 로컬 커뮤니티 | rokeol keomyuniti | Locally-trusted peers — home channel, household, single guild |
| Global Communities | 글로벌 커뮤니티 | geullobeol keomyuniti | Cross-community affinity groups (CEG: affiliations); treat as plural |
| Global Commons | 글로벌 공유지 | geullobeol gongyuji | Universal federation layer (CEG species + planet + federation) |
| Federation | 페더레이션 | pedeoreisyeon | CIRIS federation as peer network |
| The Commons | 공유지 기여 | gongyuji giyeo | Federation contribution cards screen (distinct from Global Commons layer) |
| Constitutional | 헌장적 | heonjangjeok | Accord-holder identity surface (FSD-002 §4.1); NOT national constitutional law |
| Delegation | 위임 | wiim | Granting authority to act on one's behalf |
| Trust Topology | 신뢰 토폴로지 | sinloe topolloji | Federation trust graph — peers as nodes, trust grants as edges |
| Participate | 참여 | chamyeo | Federation needs registry — register needs, others respond |
| Affiliations | 소속 관계 | sosok gwangye | CEG term for cross-community memberships |
| Identities | 신원 목록 | sinwon mongnok | Section: list of known entities at a scope |
| Trust | 신뢰 | sinloe | Section: trust state per identity |
| Trust policies | 신뢰 정책 | sinloe jeongchaek | Section: policies governing automatic trust at a scope |
| Coming Soon | 곧 출시 | got chulsi | Placeholder for unshipped features |

## Version History

- Version | Date | Changes
- 1.0 | 2026-03-27 | Initial glossary
- 1.1 | 2026-05-31 | Added Commons / Cohort-Scope vocabulary (2.9.4)

---

*이 용어집은 한국어 번역의 권위 있는 출처입니다. 모든 번역가는 CIRIS 콘텐츠를 번역하기 전에 이 문서를 참조해야 합니다.*

*This glossary is the authoritative source for Korean translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | 헌법 메시 | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | 유익증명 (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | 지식의 웹 | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | 일관성 래칫 메커니즘 | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | 헌장 | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | CIRIS 점수 | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | 안전성 입증 | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Meta-Goal M-1 | Meta-Goal M-1 | The Constitution's top-level goal; M-1 is a label, keep it |
