# CIRIS Burmese Glossary (မြန်မာ)

This glossary defines the canonical translations for key CIRIS terms in Burmese. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Burmese | Transliteration | Usage Context |
|---------|---------|-----------------|---------------|
| OBSERVE | လေ့လာပါ | Lè-la-ba | Gathering information from environment |
| SPEAK | ပြောပါ | Pyaw-ba | Communicating with users |
| TOOL | ကိရိယာ | Ki-ri-ya | Using external capabilities |
| REJECT | ငြင်းပယ်ပါ | Nyin-pè-ba | Refusing to perform an action |
| PONDER | စဉ်းစားပါ | Sin-za-ba | Deep reflection before deciding |
| DEFER | လွှဲပြောင်းပါ | Hlwè-pyaun-ba | Referring to Wise Authority |
| MEMORIZE | မှတ်သားပါ | Hmat-tha-ba | Storing information in memory |
| RECALL | ပြန်သတိရပါ | Pyan-thati-ya-ba | Retrieving from memory |
| FORGET | မေ့ပါ | Mè-ba | Removing from memory |
| TASK_COMPLETE | အလုပ်ပြီးဆုံးပြီ | A-louk-pyi-zone-pyi | Signaling task completion |

## Core Concepts

| English | Burmese | Transliteration | Definition |
|---------|---------|-----------------|------------|
| ACCORD | [DEPRECATED] သဘောတူညီချက် | Tha-baw-tu-nyi-chè | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | ပညာရှိအာဏာပိုင် | Pyin-nya-shi-a-na-paing | Human oversight entity |
| Conscience | အသိစိတ် | A-thi-seit | Ethical filter mechanism |
| Principal Hierarchy | အဓိကအဆင့်အတန်း | A-hti-ka-a-shin-a-tan | Chain of command for guidance |
| Coherence | လိုက်လျောညီထွေမှု | Laik-lyaw-nyi-htwe-hmu | Logical and contextual consistency |
| Epistemic Humility | ဗဟုသုတနှိမ့်ချမှု | Ba-hu-thu-ta-hnein-cha-hmu | Acknowledging knowledge limits |
| Integrity | သမာဓိ | Tha-ma-hti | Ethical consistency |
| Resilience | ခံနိုင်ရည် | Khan-naing-yè | Recovery from failures |
| Signalling Gratitude | ကျေးဇူးတင်ကြောင်းပြခြင်း | Kyè-zu-tin-jaung-pya-chin | Acknowledging contributions |

## Technical Terms

| English | Burmese | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Agent | အေးဂျင့် | Ei-jin | Standard term for agent |
| API | API | API | Keep in Latin |
| DMA | DMA | DMA | Decision-Making Adapter |
| LLM | LLM | LLM | Large Language Model |
| Token | တိုကင် | To-kin | Authentication/LLM context |
| Adapter | အဒက်တာ | A-dè-ta | Service extension |
| Service | ဝန်ဆောင်မှု | Wun-saung-hmu | System component |
| Pipeline | ပိုက်လိုင်း | Paik-lain | Processing chain |

## Cognitive States

| English | Burmese | Transliteration | Description |
|---------|---------|-----------------|-------------|
| WAKEUP | နိုးထ | Nò-hta | Identity confirmation state |
| WORK | အလုပ် | A-louk | Normal task processing |
| PLAY | ကစား | Ka-za | Creative exploration mode |
| SOLITUDE | တစ်ယောက်တည်း | Ti-yauk-tè | Quiet reflection state |
| DREAM | အိပ်မက် | Eik-mè | Deep introspection |
| SHUTDOWN | ပိတ် | Pei | Graceful termination |

## UI Labels

| English | Burmese | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Login | ဝင်ရောက် | Win-yauk | Enter/Sign in |
| Settings | ဆက်တင်များ | Sè-tin-mya | Configuration |
| Messages | မက်ဆေ့ချ်များ | Mè-sè-mya | Communications |
| Send | ပို့ | Po | Transmit |
| Cancel | ပယ်ဖျက် | Pè-phyè | Abort action |
| Confirm | အတည်ပြု | A-tè-pyu | Verify |
| Error | အမှား | A-hma | Mistake/failure |
| Warning | သတိပေး | Thati-pè | Alert |
| Success | အောင်မြင် | Aung-myin | Achievement |
| Loading | ဖွင့်နေသည် | Phwin-nè-thè | In progress |

## DMA-Specific Terms

| English | Burmese | Used In |
|---------|---------|---------|
| Principal Duties | အဓိကတာဝန်များ | PDMA |
| Common Sense | သာမန်ဉာဏ် | CSDMA |
| Intuition | အလိုလိုသိစိတ် | IDMA |
| Action Selection | လုပ်ဆောင်ချက်ရွေးချယ်မှု | ASPDMA |
| Domain Specific | နယ်ပယ်သီးသန့် | DSDMA |
| Tool Specific | ကိရိယာသီးသန့် | TSASPDMA |

## Pipeline Stages

| English | Burmese | Transliteration | Context |
|---------|---------|-----------------|---------|
| Think | တွေးခေါ် | Twè-khaw | Start thought |
| Context | အကြောင်းအရာ | A-jaung-a-ya | Gather context |
| DMA | ဆုံးဖြတ်ချက် | Zone-phyè-chè | Decision making |
| IDMA | အလိုလိုသိစစ်ဆေး | A-lo-lo-thi-si-sè | Intuition check |
| Select | ရွေးချယ် | Ywè-chè | Action selection |
| Ethics | ကျင့်ဝတ် | Kyin-wù | Conscience check |
| Act | လုပ်ဆောင် | Louk-saung | Execute action |
| Memory Graph | မှတ်ဉာဏ်ဂရပ် | Hma-nyan-ga-ya | Knowledge storage |

## Phrases

| English | Burmese |
|---------|---------|
| How can I help you? | ကျွန်တော်/ကျွန်မ ဘယ်လိုကူညီပေးရမလဲ? |
| I need to think about this | ဒီအကြောင်းကို စဉ်းစားဖို့လိုတယ် |
| Let me check with Wise Authority | ပညာရှိအာဏာပိုင်နဲ့ စစ်ဆေးပါရစေ |
| This action requires approval | ဤလုပ်ဆောင်ချက်သည် ခွင့်ပြုချက်လိုအပ်သည် |
| Task completed successfully | အလုပ်အောင်မြင်စွာပြီးဆုံးပါပြီ |

## Notes for Translators

1. Burmese uses its own script - do not romanize in actual translations
2. Use polite particles (ပါ/ခင်ဗျာ) for formal register
3. Technical terms (API, DMA, LLM) remain in Latin script
4. Word order is Subject-Object-Verb (SOV)
5. Preserve placeholders exactly: {action}, {threshold}, {confidence}
6. Myanmar has diverse dialects - use standard Burmese (Yangon)

## DSASPDMA Deferral Taxonomy Terms

| English | Localized | Notes |
|---------|-----------|-------|
| DSASPDMA | DSASPDMA | Keep acronym in English |
| Deferral-Specific Action Selection | ရွှေ့ဆိုင်းမှုအထူးပြု လုပ်ဆောင်ချက်ရွေးချယ်ခြင်း | DSASPDMA prompt title |
| Rights / Needs Taxonomy | အခွင့်အရေး / လိုအပ်ချက် TAXONOMY | Taxonomy section heading |
| Rights basis | အခွင့်အရေးအခြေခံ | Label for treaty-aligned rights basis |
| Operational Deferral Reason | လုပ်ငန်းဆိုင်ရာ ရွှေ့ဆိုင်းမှု အကြောင်းပြချက် CODE များ | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## CEG 0.6 Cohort Scope Vocabulary (2.9.4 Commons UX)

| English | Burmese | Transliteration | Definition |
|---------|---------|-----------------|------------|
| Cohort scope | cohort scope (အတိုင်းအတာ) | A-tain-a-ta | CEG 0.6 wire term — scale of contribution |
| Layer | အလွှာ | A-hlwa | UX surface for one cohort scope |
| Agent (Self) | အေးဂျင့် (ကိုယ်တိုင်) | Ei-jin (ko-tain) | The agent itself; first layer |
| Family | မိသားစု | Mi-tha-su | Sibling occurrences of the same agent |
| Local Community | ဒေသခံ အသိုက်အဝန်း | De-tha-khan a-thaik-a-wun | Locally-trusted peers |
| Global Communities | ကမ္ဘာလုံးဆိုင်ရာ အသိုက်အဝန်းများ | Kam-ba-lone-sain-ya a-thaik-a-wun-mya | Cross-community affinity groups |
| Global Commons | ကမ္ဘာလုံးဆိုင်ရာ Commons | Kam-ba-lone-sain-ya | Universal federation layer |
| The Commons | Commons (ပံ့ပိုးမှု ဖိဒ်) | — | Federation contribution cards screen |
| Constitutional | ဖွဲ့စည်းပုံ (Federation) | Phwè-si-pone | Accord-holder identity surface |
| Delegation | ကိုယ်စားလွှဲအပ်ခြင်း | Ko-za-hlwè-ap-chin | Delegation graph |
| Trust Topology | ယုံကြည်မှု ပုံစံ | Yone-kyi-hmu pone-zan | Federation trust graph |
| Participate | ပါဝင်ရန် | Pa-win-yan | Federation needs registry |
| Identities | အထောက်အထားများ | A-htauk-a-hta-mya | List of known entities at a scope |
| Trust | ယုံကြည်မှု | Yone-kyi-hmu | Trust state per identity |
| Trust policies | ယုံကြည်မှု မူဝါဒများ | Yone-kyi-hmu mu-wa-da-mya | Policies governing automatic trust |
| Coming Soon | မကြာမီ ရောက်ရှိမည် | Ma-kya-mi yauk-shi-mi | Placeholder for unshipped features |

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | ဖွဲ့စည်းပုံဆိုင်ရာ မက်ရှ်ကွန်ရက် | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | အကျိုးသက်သေ (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| Coherence Ratchet | လိုက်လျောညီထွေမှု ရက်ချက် | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | ဖွဲ့စည်းပုံ | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | CIRIS အမှတ်ပေးစနစ် | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | လုံခြုံရေးကိစ္စ | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |

## Cultural Considerations

### UI labels and review conduct (ciris.ai)
- Keys under `nav.*`, `footer.*`, `lobby.store.*`, and any key ending in `Label`, `Title`, `Btn`, `Cta`, `Head`, `Eyebrow`, `Kicker` or `name` are compact UI labels or headings. Translate them as a noun phrase in this language's own label convention: no leading article unless the language requires one on a label, and the language's own casing for labels.
- Glossary casing is not normative (the glossary block header says so). Capitalization alone is never a finding, at any severity.
- Agreement with this glossary or with the anchors is NOT a finding. Report a terminology finding only when the translation disagrees with them.
- `lobby.store.*` strings are the two lines of an App Store / Google Play badge ("Download on the" + "App Store", "Get it on" + "Google Play"). Judge each line as half of the standard badge wording, never as a sentence.
- When the English source itself says Accord (a historical reference to the document the Constitution replaced), keep the shipped rendering the anchors use. The retired term in the source is not a terminology finding.
