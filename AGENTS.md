# РМК (Росмедконсалтинг) — сайт

Карточка в базе: `D:\agent-hub\projects\rmk.md`. План и статус — [PLAN.md](PLAN.md).

## Стек (как у KMF)

Next.js 16 (App Router, TypeScript strict), React 19, Tailwind 4 + токены из Figma, `motion`/`gsap` по необходимости, npm.
Позже — Payload CMS 3 + PostgreSQL (самая новая ветка, `tech/versions.md`), выкладка на сервер (`coolify-deploy`).
Образец решений — проект KMF (`D:\si-team проекты\kmf`): его `DESIGN.md`, `CLAUDE.md`, скрипты проверки вёрстки. Брать оттуда, а не придумывать заново.

## Этапы

1. Макет под вёрстку в Figma и адаптив — скиллы `figma-design`, `ui-ux-pro-max`.
2. Локальная вёрстка без CMS: тексты и данные — в `src/data/*.ts`, чтобы потом перенести в Payload без переделки компонентов. Скилл `figma-to-code`.
3. Показ клиенту — статичная сборка на GitHub Pages (репозиторий на аккаунте Si-Teamru, как KMF): `output: 'export'`, `basePath` = `/<repo>`, картинки из `public` через хелпер с префиксом. Рецепт — коммит `454b336` в репозитории KMF (`pages.yml`, `asset()`).
4. CMS и сервер.

## Дизайн-система

Всё про дизайн (Figma, токены, компоненты, адаптив, тексты, проверка) — в [DESIGN.md](DESIGN.md). Любую задачу с вёрсткой, стилями, текстами интерфейса или Figma начинать с его раздела «0. Порядок работы». Сейчас это каркас, заполняется на этапе 1.

@DESIGN.md

Тексты интерфейса — по-русски, через типограф (`tech/typograph.md`).

## Современная платформа — обязательно

Перед вёрсткой любого интерактивного блока (попап, меню, форма, карусель, аккордеон, анимация, тема, картинки первого экрана) найти гайд в скилле `modern-web-guidance` и делать по нему.

**Политика браузеров:** Baseline Widely available — без запасного варианта. Newly available — с проверкой поддержки и простым запасным путём: не больше ~20 строк, без полифилов и новых зависимостей. Проверка: Chrome, Safari iOS, Firefox, Яндекс Браузер.

С первого дня:
- `<meta name="color-scheme">` по факту макета; если будет тёмная тема — токены через `light-dark()` и переключатель с возвратом к системной.
- Попапы и меню — `<dialog>` / `popover`, анимация — `@starting-style` + `transition-behavior: allow-discrete`, без своих оверлеев, ловушек фокуса и `overflow: hidden` на `html`. Фокус возвращается на кнопку, открывшую окно.
- Формы: `:user-invalid`, `aria-invalid` только после ввода, подсказки над полем через `aria-describedby` (не только placeholder), правильные `autocomplete` и `type`/`inputmode`, `:autofill` без сдвига раскладки.
- Анимации: `prefers-reduced-motion` гасит смещения, `scroll-behavior: smooth` и view transitions; без общего сброса `0.01ms`. Анимации по прокрутке — scroll-driven на CSS, где хватает; GSAP — для того, что CSS не умеет.
- Карусели и свайпы — scroll-snap, а не `pointermove`.
- Без сдвигов раскладки: `width`/`height` или `aspect-ratio` у картинок и видео, `dvh`/`svh` вместо `vh`, `font-size-adjust` у запасного шрифта.
- Картинка первого экрана — `priority`/`fetchpriority="high"`, остальные лениво; длинные секции ниже первого экрана — `content-visibility: auto` + `contain-intrinsic-size`.
- Долгие задачи на JS делить `scheduler.yield()` (INP < 200 мс).
- Сервер (этап 4): заголовки CSP (nonce + `'strict-dynamic'`), HTML из CMS — только через санитайзер (`setHTML()` с DOMPurify как запасным вариантом).

## Проверка

`lint`, `typecheck`, `build`; адаптив — 360, 834, 1024, 1280, 1440, 1920, горизонтальная прокрутка с видимой полосой (`tech/frontend.md`); Lighthouse — LCP, CLS, INP, доступность.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
