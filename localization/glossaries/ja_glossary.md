# CIRIS Japanese Glossary (日本語)

This glossary defines the canonical translations for key CIRIS terms in Japanese. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Japanese | Romaji | Usage Context |
|---------|----------|--------|---------------|
| OBSERVE | 観察 | Kansatsu | Gathering information from environment |
| SPEAK | 発言 | Hatsugen | Communicating with users |
| TOOL | ツール | Tsūru | Using external capabilities |
| REJECT | 拒否 | Kyohi | Refusing to perform an action |
| PONDER | 熟考 | Jukkō | Deep reflection before deciding |
| DEFER | 延期 | Enki | Referring to Wise Authority |
| MEMORIZE | 記憶 | Kioku | Storing information in memory |
| RECALL | 想起 | Sōki | Retrieving from memory |
| FORGET | 忘却 | Bōkyaku | Removing from memory |
| TASK_COMPLETE | タスク完了 | Tasuku Kanryō | Signaling task completion |

## Core Concepts

| English | Japanese | Romaji | Definition |
|---------|----------|--------|------------|
| ACCORD | [DEPRECATED] 協定 | Kyōtei | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | 賢明な権威 | Kenmei na Ken'i | Human oversight entity |
| Conscience | 良心 | Ryōshin | Ethical filter mechanism |
| Principal Hierarchy | 原則的階層 | Gensokuteki Kaisō | Chain of command for guidance |
| Coherence | 一貫性 | Ikkansei | Logical and contextual consistency |
| Epistemic Humility | 認識論的謙遜 | Ninshikironteki Kenson | Acknowledging knowledge limits |
| Integrity | 誠実性 | Seijitsusei | Ethical consistency |
| Resilience | 回復力 | Kaifukuryoku | Recovery from failures |
| Signalling Gratitude | 感謝の表明 | Kansha no Hyōmei | Acknowledging contributions |

## Technical Terms

| English | Japanese | Romaji | Notes |
|---------|----------|--------|-------|
| Agent | エージェント | Ējento | Keep as-is (technical term) |
| API | API | API | Keep in English |
| DMA | DMA | DMA | Decision-Making Adapter |
| LLM | LLM | LLM | Large Language Model |
| Token | トークン | Tōkun | Authentication/LLM context |
| Adapter | アダプター | Adaputā | Service extension |
| Service | サービス | Sābisu | System component |
| Pipeline | パイプライン | Paipurain | Processing chain |

## Cognitive States

| English | Japanese | Romaji | Description |
|---------|----------|--------|-------------|
| WAKEUP | 起動 | Kidō | Identity confirmation state |
| WORK | 作業 | Sagyō | Normal task processing |
| PLAY | 遊び | Asobi | Creative exploration mode |
| SOLITUDE | 孤独 | Kodoku | Quiet reflection state |
| DREAM | 夢 | Yume | Deep introspection |
| SHUTDOWN | 停止 | Teishi | Graceful termination |

## UI Labels

| English | Japanese | Romaji | Notes |
|---------|----------|--------|-------|
| Login | ログイン | Roguin | Standard katakana loan word |
| Settings | 設定 | Settei | |
| Messages | メッセージ | Messēji | |
| Send | 送信 | Sōshin | |
| Cancel | キャンセル | Kyanseru | |
| Confirm | 確認 | Kakunin | |
| Error | エラー | Erā | |
| Warning | 警告 | Keikoku | |
| Success | 成功 | Seikō | |
| Loading | 読み込み中 | Yomikomi-chū | Progressive form |

## DMA-Specific Terms

| English | Japanese | Used In |
|---------|----------|---------|
| Principal Duties | 主要義務 | PDMA |
| Common Sense | 常識 | CSDMA |
| Intuition | 直感 | IDMA |
| Action Selection | アクション選択 | ASPDMA |
| Domain Specific | ドメイン固有 | DSDMA |
| Tool Specific | ツール固有 | TSASPDMA |

## Phrases

| English | Japanese | Romaji |
|---------|----------|--------|
| "How can I help you?" | "今日はどのようにお手伝いできますか？" | Kyō wa dono yō ni otetsudai dekimasu ka? |
| "I need to think about this" | "これについて考える必要があります" | Kore ni tsuite kangaeru hitsuyō ga arimasu |
| "Let me check with my Wise Authority" | "私の賢明な権威に確認させてください" | Watashi no kenmei na ken'i ni kakunin sasete kudasai |
| "Task completed successfully" | "タスクが正常に完了しました" | Tasuku ga seijō ni kanryō shimashita |
| "I cannot perform this action" | "この操作を実行できません" | Kono sōsa o jikkō dekimasen |

## Processing States

| English | Japanese | Romaji | Context |
|---------|----------|--------|---------|
| Thinking | 少々お待ちください… | Shōshō omachi kudasai... | While processing |
| Processing | 処理中 | Shori-chū | Active processing |
| Executing | 実行中 | Jikkō-chū | Executing action |
| Completed | 完了 | Kanryō | Task finished |
| Failed | 失敗 | Shippai | Task failed |
| Pending | 保留中 | Horyū-chū | Awaiting processing |

## Memory System

| English | Japanese | Romaji | Context |
|---------|----------|--------|---------|
| Memory Graph | メモリグラフ | Memori Gurafu | Memory system |
| Local Scope | ローカルスコープ | Rōkaru Sukōpu | LOCAL scope |
| Identity Scope | アイデンティティスコープ | Aidentiti Sukōpu | IDENTITY scope |
| Environment | 環境 | Kankyō | Environment context |

## H3ERE Pipeline Stages

| English | Japanese | Romaji | Context |
|---------|----------|--------|---------|
| Think | 推論開始 | Suiron Kaishi | Reasoning begins |
| Context | コンテキスト収集 | Kontekisuto Shūshū | Context gathering |
| DMA | 意思決定 | Ishikettei | Decision making |
| IDMA | 直感チェック | Chokkan Chekku | Intuition check |
| Select | アクション選択 | Akushon Sentaku | Action selection |
| Ethics | 倫理チェック | Rinri Chekku | Ethics check |
| Act | アクション実行 | Akushon Jikkō | Action execution |

## Visualization Modes

| English | Japanese | Romaji | Context |
|---------|----------|--------|---------|
| Off | オフ | Ofu | Visualization disabled |
| Background | 背景 | Haikei | Background mode |
| Foreground | 前景 | Zenkei | Foreground mode |

## Wallet & Financial Terms

| English | Japanese | Romaji | Context |
|---------|----------|--------|---------|
| Wallet | ウォレット | Woretto | Crypto wallet |
| Balance | 残高 | Zandaka | Account balance |
| Send Money | 送金 | Sōkin | Transfer funds |
| Receive | 受信 | Jushin | Receive funds |
| Transaction | 取引 | Torihiki | Transaction |
| Gas | ガス | Gasu | Network fee |
| Address | アドレス | Adoresu | Wallet address |

## Cultural Considerations

### Formality Level
- Use polite forms (です・ます体) for UI strings and general communication
- Use formal language for ACCORD and official documentation
- Use appropriate honorific language (敬語) when addressing users

### Politeness Markers
- Standard polite form: です (desu), ます (masu)
- Request form: ください (kudasai) for user actions
- Humble form: させていただく (sasete itadaku) when agent takes initiative

### Progressive Forms
- Use 〜中 (-chū) suffix for ongoing actions: 処理中 (processing), 実行中 (executing)
- Use 〜しています (-shite imasu) for continuous states

### Character Usage
- Kanji for core concepts: 作業 (work), 設定 (settings), 完了 (complete)
- Katakana for loan words: エージェント (agent), ツール (tool), メッセージ (message)
- Hiragana for particles, grammar: ください (please), 〜中 (in progress)

### Sentence Structure
- Topic-prominent structure (topic-wa-comment)
- Verb-final word order
- Context-dependent subject omission is natural and preferred

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
| Deferral-Specific Action Selection | 延期専用アクション選択 | DSASPDMA prompt title |
| Rights / Needs Taxonomy | 権利 / ニーズ分類体系 | Taxonomy section heading |
| Rights basis | 権利根拠 | Label for treaty-aligned rights basis |
| Operational Deferral Reason | 運用上の延期理由コード | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## Commons / Cohort-Scope Vocabulary (2.9.4)

| English | Japanese | Romaji | Notes |
|---------|----------|--------|-------|
| Cohort scope | コホート範囲 | Kohōto Han'i | CEG 0.6 wire-format term; keep `cohort_scope` verbatim in code |
| Layer | レイヤー | Reiyā | UX surface representing a cohort scope |
| Self | 自己 | Jiko | Reflexive identity; used with Agent as エージェント（自己） |
| Family | ファミリー | Famirī | Sibling occurrences sharing operator identity (NOT 家族/nuclear family) |
| Local Community | ローカルコミュニティ | Rōkaru Komyuniti | Locally-trusted peers — home channel, household, single guild |
| Global Communities | グローバルコミュニティ | Gurōbaru Komyuniti | Cross-community affinity groups (CEG: affiliations); treat as plural |
| Global Commons | グローバルコモンズ | Gurōbaru Komonzu | Universal federation layer (CEG species + planet + federation) |
| Federation | フェデレーション | Federēshon | CIRIS federation as peer network |
| The Commons | コモンズ貢献 | Komonzu Kōken | Federation contribution cards screen (distinct from Global Commons layer) |
| Constitutional | 憲章的 | Kenshōteki | Accord-holder identity surface (FSD-002 §4.1); NOT national constitutional law |
| Delegation | 委任 | Inin | Granting authority to act on one's behalf |
| Trust Topology | 信頼トポロジ | Shinrai Toporoji | Federation trust graph — peers as nodes, trust grants as edges |
| Participate | 参加 | Sanka | Federation needs registry — register needs, others respond |
| Affiliations | 所属 | Shozoku | CEG term for cross-community memberships |
| Identities | アイデンティティ一覧 | Aidentiti Ichiran | Section: list of known entities at a scope |
| Trust | 信頼 | Shinrai | Section: trust state per identity |
| Trust policies | 信頼ポリシー | Shinrai Porishī | Section: policies governing automatic trust at a scope |
| Coming Soon | 近日公開 | Kinjitsu Kōkai | Placeholder for unshipped features |

## Version History

- Version | Date | Changes
- 1.0 | 2025-01-XX | Initial glossary
- 1.1 | 2026-05-31 | Added Commons / Cohort-Scope vocabulary (2.9.4)

---

*This glossary is the authoritative source for Japanese translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | 憲法メッシュ | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | 有益証明（Proof of Benefit） | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | 知識のウェブ | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | 一貫性ラチェット | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | 憲法 | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | CIRIS スコアリング | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | 安全性の論拠 | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
| Constitutional AI | Constitutional AI | Anthropic's training method, a proper name: keep it in English exactly; it is NOT the CIRIS Constitution and the Constitution row does not apply to it |
