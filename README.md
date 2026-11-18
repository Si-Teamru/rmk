# РМК — сайт Росмедконсалтинга

Next.js 16 + Tailwind 4; позже Payload CMS 3 + PostgreSQL.

- **План и статус:** [PLAN.md](PLAN.md)
- **Правила разработки (в т. ч. для ИИ-агентов):** [AGENTS.md](AGENTS.md), дизайн-система — [DESIGN.md](DESIGN.md)
- **Макет:** Figma, файл `EcKBc3G43tWwM3XtI2hZwi` (страницы «Вёрстка» и «UI-kit»)
- **Витрина для клиента:** https://si-teamru.github.io/rmk/ — собирается при каждом пуше в `main` (`.github/workflows/pages.yml`)

## Запуск

```sh
npm ci
npm run dev        # http://localhost:3000
```

Проверки: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
Токены из Figma — `npm run tokens`, шрифты — `npm run fonts` (подробности — DESIGN.md §2, §9).
