/**
 * Figma-переменные → src/styles/tokens.css (по образцу KMF).
 *
 * Источник: scripts/figma/variables.json — ответы Figma MCP `get_variable_defs` по главной 1440 и 360
 * и доске кнопок. Обновление: вызвать `get_variable_defs` для узлов из файла, заменить ответы, `npm run tokens`.
 *
 * Что генерируется:
 *   - цвета `color_text-primary` → --text-primary и в Tailwind `text-text-primary`, `bg-bg-navy`;
 *   - `layout/*` → --layout-*: значения 1440 и 360 интерполируются clamp(), в Tailwind `px-container-padding`;
 *   - `radius/*` → `rounded-24`; `shadow/card` → `shadow-card`;
 *   - текстовые стили `Desktop/text_display` → утилита `type-display` (семейство, размер, межстрочный, вес).
 *   `space/*` не выгружаются: шкала Tailwind уже 4 px (space/24 = `p-6`).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const MOBILE_VW = 360
const DESKTOP_VW = 1440
/** Порог переключения неинтерполируемых свойств (вес, межстрочный). */
const MOBILE_BREAKPOINT = 768
const FAMILY: Record<string, string> = {
  Unbounded: 'var(--font-display)',
  Hauora: 'var(--font-sans)',
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const data = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/figma/variables.json'), 'utf8'),
) as {
  fileKey: string
  sources: Record<'desktop' | 'mobile' | 'kit', Record<string, Record<string, string>>>
}

type Font = {
  family: string
  size: number
  weight: number
  lineHeight: number
  letterSpacing: number
}
type Pair<T> = { desktop?: T; mobile?: T }

const parseFont = (s: string): Font => {
  const num = (key: string) => Number(new RegExp(`${key}: ([\\d.-]+)`).exec(s)?.[1] ?? 0)
  const family = /family: "([^"]+)"/.exec(s)?.[1] ?? ''
  if (!FAMILY[family]) throw new Error(`Нет семейства в FAMILY: ${family}`)
  return {
    family,
    size: num('size'),
    weight: num('weight'),
    lineHeight: Math.round(num('lineHeight') * 100) / 100,
    letterSpacing: num('letterSpacing'),
  }
}

const parseShadow = (s: string) => {
  const m =
    /color: (#\w+), offset: \(([-\d.]+), ([-\d.]+)\), radius: ([\d.]+), spread: ([-\d.]+)/.exec(s)
  if (!m) throw new Error(`Не разобрана тень: ${s}`)
  return `${m[2]}px ${m[3]}px ${m[4]}px ${m[5]}px ${m[1]}`
}

/** Ключ Figma → имя CSS-переменной; null — не выгружаем. */
const varName = (key: string) => {
  let m
  if ((m = /^color_(.+)$/.exec(key))) return m[1]
  if ((m = /^var\(--(.+)\)$/.exec(key))) return m[1]
  if ((m = /^layout\/(.+)$/.exec(key))) return `layout-${m[1]}`
  if ((m = /^radius\/(\d+)$/.exec(key))) return `radius-${m[1]}`
  if ((m = /^shadow\/(.+)$/.exec(key))) return `shadow-${m[1]}`
  return null
}

const vars = new Map<string, Pair<string>>()
const fonts = new Map<string, Pair<Font>>()

for (const mode of ['desktop', 'mobile', 'kit'] as const) {
  for (const raw of Object.values(data.sources[mode] ?? {})) {
    for (const [key, value] of Object.entries(raw)) {
      const font = /^(Desktop|Mobile)\/(?:text_)?(.+)$/.exec(key)
      if (font) {
        const entry = fonts.get(font[2]) ?? {}
        entry[font[1].toLowerCase() as 'desktop' | 'mobile'] ??= parseFont(value)
        fonts.set(font[2], entry)
        continue
      }
      const name = varName(key)
      if (!name) continue
      const entry = vars.get(name) ?? {}
      // Доска кита не привязана к ширине: только дополняет недостающее.
      if (mode === 'kit') {
        entry.desktop ??= value
        entry.mobile ??= value
      } else entry[mode] ??= value
      vars.set(name, entry)
    }
  }
}

const round = (n: number) => Math.round(n * 10000) / 10000

/** Линейная интерполяция px-значения между 360 и 1440. */
const fluid = (mobile: number, desktop: number) => {
  if (mobile === desktop) return `${desktop}px`
  const slope = (desktop - mobile) / (DESKTOP_VW - MOBILE_VW)
  const [min, max] = mobile < desktop ? [mobile, desktop] : [desktop, mobile]
  return `clamp(${min}px, ${round(mobile - slope * MOBILE_VW)}px + ${round(slope * 100)}vw, ${max}px)`
}

const sorted = <T>(m: Map<string, T>) => [...m].sort((a, b) => a[0].localeCompare(b[0]))

const rootLines: string[] = []
const layoutLines: string[] = []
const mobileLines: string[] = []
const staticLines: string[] = []
const inlineLines: string[] = []
const utilities: string[] = []
const warnings: string[] = []

rootLines.push('  /* Цвета */')
for (const [name, v] of sorted(vars)) {
  const d = (v.desktop ?? v.mobile)!
  const m = v.mobile ?? d
  if (!v.desktop || !v.mobile) warnings.push(name)
  if (d.startsWith('#')) {
    rootLines.push(`  --${name}: ${d};`)
    inlineLines.push(`  --color-${name}: var(--${name});`)
  } else if (name.startsWith('shadow-')) {
    staticLines.push(`  --${name}: ${parseShadow(d)};`)
  } else if (name.startsWith('radius-')) {
    staticLines.push(`  --${name}: ${d}px;`)
  } else {
    layoutLines.push(`  --${name}: ${fluid(Number(m), Number(d))};`)
    inlineLines.push(`  --spacing-${name.replace(/^layout-/, '')}: var(--${name});`)
  }
}

rootLines.push('', '  /* Раскладка: 360 → 1440 */', ...layoutLines, '', '  /* Типографика */')
for (const [style, f] of sorted(fonts)) {
  const d = (f.desktop ?? f.mobile)!
  const m = f.mobile ?? d
  if (!f.desktop || !f.mobile) warnings.push(`type-${style}`)
  const p = `--type-${style}`
  rootLines.push(
    `  ${p}-size: ${fluid(m.size, d.size)};`,
    `  ${p}-line-height: ${d.lineHeight};`,
    `  ${p}-weight: ${d.weight};`,
  )
  if (m.lineHeight !== d.lineHeight) mobileLines.push(`    ${p}-line-height: ${m.lineHeight};`)
  if (m.weight !== d.weight) mobileLines.push(`    ${p}-weight: ${m.weight};`)
  utilities.push(
    `@utility type-${style} {`,
    `  font-family: ${FAMILY[d.family]};`,
    `  font-size: var(${p}-size);`,
    `  line-height: var(${p}-line-height);`,
    `  font-weight: var(${p}-weight);`,
    ...(d.letterSpacing ? [`  letter-spacing: ${d.letterSpacing}px;`] : []),
    '}',
  )
}

const css = `/*
 * Сгенерировано scripts/export-tokens.ts из Figma (${data.fileKey}). Не редактировать вручную —
 * обновить scripts/figma/variables.json и запустить \`npm run tokens\`.
 */
:root {
${rootLines.join('\n')}
}

@media (width < ${MOBILE_BREAKPOINT}px) {
  :root {
${mobileLines.join('\n')}
  }
}

@theme static {
${staticLines.join('\n')}
}

@theme inline {
${inlineLines.join('\n')}
}

${utilities.join('\n')}
`

fs.writeFileSync(path.join(root, 'src/styles/tokens.css'), css)
console.log(`tokens.css: ${vars.size} переменных, ${fonts.size} текстовых стилей`)
if (warnings.length)
  console.warn(`Есть только для одной ширины (взято одно значение): ${warnings.join(', ')}`)
