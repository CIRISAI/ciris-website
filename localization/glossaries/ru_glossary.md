# CIRIS Russian Glossary (Русский)

This glossary defines the canonical translations for key CIRIS terms in Russian. All translators must use these terms consistently across ACCORD, Guide, UI, and DMA prompts.

## Core Action Verbs

| English | Russian | Transliteration | Usage Context |
|---------|---------|-----------------|---------------|
| OBSERVE | Наблюдать | Nablyudat' | Gathering information from environment |
| SPEAK | Говорить | Govorit' | Communicating with users |
| TOOL | Инструмент | Instrument | Using external capabilities |
| REJECT | Отклонить | Otklonit' | Refusing to perform an action |
| PONDER | Размышлять | Razmyshlyat' | Deep reflection before deciding |
| DEFER | Отложить | Otlozhit' | Referring to Wise Authority |
| MEMORIZE | Запомнить | Zapomnit' | Storing information in memory |
| RECALL | Вспомнить | Vspomnit' | Retrieving from memory |
| FORGET | Забыть | Zabyt' | Removing from memory |
| TASK_COMPLETE | Задача выполнена | Zadacha vypolnena | Signaling task completion |

## Core Concepts

| English | Russian | Transliteration | Definition |
|---------|---------|-----------------|------------|
| ACCORD | [DEPRECATED] Соглашение | Soglasheniye | DEPRECATED — superseded by the CIRIS Constitution. Do NOT coin a rendering for it. The ROLE (`accord holder`, `accord_custody`, `/v1/accord/*`) is live and follows the shipped strings, not this row. Was: The covenant governing agent behavior When the ENGLISH SOURCE itself says Accord (history: the document the Constitution replaced), keep the shipped rendering the anchors use and do not flag it; the retired term is in the source, not the translation. |
| Wise Authority | Мудрый Авторитет | Mudryy Avtoritet | Human oversight entity |
| Conscience | Совесть | Sovest' | Ethical filter mechanism |
| Principal Hierarchy | Иерархия Принципов | Iyerarkhiya Printsipov | Chain of command for guidance |
| Coherence | Когерентность | Kogerentnost' | Logical and contextual consistency |
| Epistemic Humility | Эпистемическая Скромность | Epistemicheskaya Skromnost' | Acknowledging knowledge limits |
| Integrity | Целостность | Tselostnost' | Ethical consistency |
| Resilience | Устойчивость | Ustoychivost' | Recovery from failures |
| Signalling Gratitude | Выражение Благодарности | Vyrazheniye Blagodarnosti | Acknowledging contributions |
| Agent | Агент | Agent | AI agent entity |
| Deferral | Отложение | Otlozheniye | Referring decision to authority |

## Technical Terms

| English | Russian | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Agent | Агент | Agent | Keep as-is (technical term) |
| API | API | API | Keep in English |
| DMA | DMA | DMA | Decision-Making Adapter |
| LLM | LLM | LLM | Large Language Model |
| Token | Токен | Token | Authentication/LLM context |
| Adapter | Адаптер | Adapter | Service extension |
| Service | Сервис | Servis | System component |
| Pipeline | Конвейер | Konveyer | Processing chain |
| Tool | Инструмент | Instrument | External capability |

## Cognitive States

| English | Russian | Transliteration | Description |
|---------|---------|-----------------|-------------|
| WAKEUP | ПРОБУЖДЕНИЕ | Probuzhdeniye | Identity confirmation state |
| WORK | РАБОТА | Rabota | Normal task processing |
| PLAY | ИГРА | Igra | Creative exploration mode |
| SOLITUDE | УЕДИНЕНИЕ | Uyedineniye | Quiet reflection state |
| DREAM | СОН | Son | Deep introspection |
| SHUTDOWN | ВЫКЛЮЧЕНИЕ | Vyklyucheniye | Graceful termination |

## UI Labels

| English | Russian | Notes |
|---------|---------|-------|
| Login | Войти | Can also use "Вход" (noun form) |
| Settings | Настройки | |
| Messages | Сообщения | |
| Send | Отправить | |
| Cancel | Отмена | |
| Confirm | Подтвердить | |
| Error | Ошибка | |
| Warning | Предупреждение | |
| Success | Успешно | |
| Loading | Загрузка | |
| Save | Сохранить | |
| Back | Назад | |
| Next | Далее | |
| Close | Закрыть | |
| Retry | Повторить | |

## DMA-Specific Terms

| English | Russian | Used In |
|---------|---------|---------|
| Principal Duties | Основные Обязанности | PDMA |
| Common Sense | Здравый Смысл | CSDMA |
| Intuition | Интуиция | IDMA |
| Action Selection | Выбор Действия | ASPDMA |
| Domain Specific | Специфичный для Домена | DSDMA |
| Tool Specific | Специфичный для Инструмента | TSASPDMA |
| Conscience Feedback | Обратная Связь Совести | Conscience evaluation |

## Action Outcomes

| English | Russian | Transliteration |
|---------|---------|-----------------|
| Success | Успешно | Uspeshno |
| Failure | Неудача | Neudacha |
| Error | Ошибка | Oshibka |
| Pending | Ожидание | Ozhidaniye |
| Completed | Завершено | Zaversheno |

## Phrases

| English | Russian |
|---------|---------|
| "How can I help you?" | "Чем могу помочь?" |
| "I need to think about this" | "Мне нужно об этом подумать" |
| "Let me check with my Wise Authority" | "Мне нужно проконсультироваться с человеком-наставником" |
| "Task completed successfully" | "Задача успешно выполнена" |
| "I cannot perform this action" | "Я не могу выполнить это действие" |
| "Deferred to Wise Authority" | "Отложено к Мудрому Авторитету" |

## Processing States

| English | Russian | Transliteration |
|---------|---------|-----------------|
| Thinking | Думаю | Dumayu |
| Processing | Обработка | Obrabotka |
| Gathering context | Сбор контекста | Sbor konteksta |
| Evaluating | Оценка | Otsenka |
| Checking ethics | Проверка этики | Proverka etiki |
| Selecting action | Выбор действия | Vybor deystviya |
| Speaking | Говорю | Govoryu |
| Using tool | Использование инструмента | Ispol'zovaniye instrumenta |
| Pondering | Размышление | Razmyshleniye |
| Saving to memory | Сохранение в память | Sokhraneniye v pamyat' |
| Retrieving from memory | Извлечение из памяти | Izvlecheniye iz pamyati |

## System Components

| English | Russian | Transliteration |
|---------|---------|-----------------|
| Memory Graph | Граф Памяти | Graf Pamyati |
| Audit Trail | Журнал Аудита | Zhurnal Audita |
| Telemetry | Телеметрия | Telemetriya |
| Configuration | Конфигурация | Konfiguratsiya |
| Runtime | Среда Выполнения | Sreda Vypolneniya |
| Services | Сервисы | Servisy |
| Scheduler | Планировщик | Planirovshchik |
| Wallet | Кошелёк | Koshelyok |

## Cultural Considerations

### Formality Level
- Use formal Russian register (литературный русский) for ACCORD and official documentation
- Use conversational Russian (разговорный язык) for UI strings and chat messages
- Maintain professional tone without excessive formality in agent interactions

### Addressing Users
- Russian has formal "Вы" and informal "ты" forms
- Use formal "Вы" (capitalized) in official documentation
- Use lowercase "вы" in casual agent interactions
- For Wise Authority references, use respectful terminology

### Grammar Notes
- Russian uses Cyrillic script (аа, бб, вв, etc.)
- Russian has grammatical gender (masculine, feminine, neuter)
- Verb conjugation changes based on subject and tense
- Word order is flexible but typically Subject-Verb-Object
- Many technical terms borrowed from English remain unchanged

### Technical Translation Patterns
- Computing terms often use transliterations: "файл" (file), "сервер" (server)
- Some terms remain in English: API, LLM, DMA, URL
- UI actions typically use infinitive verb forms
- Status messages use present tense or short adjectives

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
| Deferral-Specific Action Selection | ВЫБОР ДЕЙСТВИЯ ДЛЯ ОТЛОЖЕННОГО РЕШЕНИЯ | DSASPDMA prompt title |
| Rights / Needs Taxonomy | ТАКСОНОМИЯ ПРАВ / ПОТРЕБНОСТЕЙ | Taxonomy section heading |
| Rights basis | Правовое основание | Label for treaty-aligned rights basis |
| Operational Deferral Reason | КОДЫ ОПЕРАЦИОННЫХ ПРИЧИН ОТЛОЖЕНИЯ | Operational reason-code section heading |
| primary_need_category | primary_need_category | JSON key; keep in English |
| operational_reason | operational_reason | JSON key; keep in English |
| secondary_need_categories | secondary_need_categories | JSON key; keep in English |
| rights_basis | rights_basis | JSON key; keep in English |
| domain_hint | domain_hint | JSON key; keep in English |

## Commons / Cohort-Scope UX (CEG 0.6)

| English | Russian | Transliteration | Notes |
|---------|---------|-----------------|-------|
| Cohort scope | Охват когорты | Okhvat kogorty | Технический термин CIRIS; в коде остаётся `cohort_scope` |
| Layer | Слой | Sloy | UX-поверхность одного охвата когорты |
| Agent (Self) | Агент (Я) | Agent (Ya) | Агент остаётся «Агент»; Self — «Я» как рефлексивное самоопределение |
| Family | Семья | Sem'ya | Родственные экземпляры — «братья и сёстры» одного агента, не нуклеарная семья |
| Local Community | Локальное сообщество | Lokal'noye soobshchestvo | Сообщество географической / непосредственной близости |
| Global Communities | Глобальные сообщества | Global'nyye soobshchestva | Множественное число — аффилиации поверх границ |
| Global Commons | Глобальное достояние | Global'noye dostoyaniye | Самый широкий охват; универсальная федеративная поверхность |
| Federation | Федерация | Federatsiya | Уже в глоссарии — сеть равноправных узлов |
| The Commons | Лента достояния | Lenta dostoyaniya | Экран карточек вкладов федерации — отличать от «Глобального достояния» как охвата |
| Constitutional | Конституциональный | Konstitutsional'nyy | Конституциональная структура федерации, не государственное право |
| Delegation | Делегирование | Delegirovaniye | Граф делегирования: переданные и полученные полномочия |
| Trust Topology | Топология доверия | Topologiya doveriya | Граф доверия: узлы — пиры, рёбра — выдачи доверия |
| Participate | Участвовать | Uchastvovat' | Глагол: участвовать / вносить вклад в реестр потребностей |
| Identities | Идентичности | Identichnosti | Список известных сущностей в данном охвате |
| Trust | Доверие | Doveriye | Состояние доверия по каждой идентичности |
| Trust policies | Политики доверия | Politiki doveriya | Правила автоматического доверия в данном охвате |
| Coming Soon | Скоро | Skoro | Заглушка для непоставленных функций |

## Version History

- Version | Date | Changes
- 1.0 | 2026-03-27 | Initial glossary
- 1.1 | 2026-05-31 | Added CEG 0.6 cohort-scope / Commons UX vocabulary

---

*This glossary is the authoritative source for Russian translations. All translators must consult this document before translating any CIRIS content.*

## Website Terms (ciris.ai)

Coined on the website and already shipped in this language; these renderings
are the established canon (harvested 2026-09-01 from the live dictionaries).
Keep them exactly, including any article the rendering carries.

| English | Rendering | Usage Context |
|---------|-----------|---------------|
| Constitutional Mesh | Конституционная меш-сеть | The /constitutional-mesh page identity; "post-quantum decentralized constitutional mesh" is the category phrase |
| Proof of Benefit | Доказательство пользы (Proof of Benefit) | Governance standing earned, not bought or mined; /constitutional-mesh section title |
| epistemic web | эпистемическая сеть | The site's masthead phrase for the CIRIS stack |
| Coherence Ratchet | Когерентный храповик | Nav label and the /coherence-ratchet page identity; a coined mechanism name, keep the compound whole |
| Constitution | Конституция | The CIRIS Constitution, the governing document (replaces the Accord); also the /constitution nav label |
| CIRIS Scoring | Оценка CIRIS | Product name of the scoring page; keep the CIRIS mark as is |
| safety case | Обоснование безопасности | The argued case that CIRIS is safe (the /safety page); a term of art from safety engineering, not a legal case |
