/**
 * Общие элементы кита (Figma EcKBc3G43tWwM3XtI2hZwi, страница «UI-kit»): иконки 3011:1037–1043, 3019:499,
 * Button / Primary 3034:334, Button / More 3034:352, разбор выделений `**…**` из src/data.
 * Иконки — пути скачанных SVG инлайном, цвет из currentColor (меняется в состояниях).
 */
import type { ComponentProps, ReactNode } from 'react'

const icons = {
  'arrow-right': { size: [24, 24], stroke: 2, d: 'M3 12H21M14 19L21 12L14 5' },
  'arrow-up': { size: [24, 44], stroke: 4, d: 'M12 40.5V3.5M20 11.5L12 3.5L4 11.5' },
  'arrow-up-right': { size: [16, 16], stroke: 1.65, d: 'M3 13L13 3M13 11.5V3H4.5' },
  'chevron-right': { size: [16, 16], stroke: 1.65, d: 'M4.5 1L11.5 8L4.5 15' },
  menu: { size: [24, 24], stroke: 2, d: 'M4 6H20M4 12H20M4 18H20' },
} as const

export function Icon({ name, className }: { name: keyof typeof icons; className?: string }) {
  const {
    size: [w, h],
    stroke,
    d,
  } = icons[name]
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      aria-hidden
      className={`shrink-0 ${className ?? ''}`}
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** `**…**` → <span className={accent}>. Без markdown-библиотеки: другой разметки в текстах нет. */
export function Rich({ text, accent }: { text: string; accent: string }) {
  return text.split('**').map((part, i) =>
    i % 2 ? (
      <span key={i} className={accent}>
        {part}
      </span>
    ) : (
      part
    ),
  )
}

type LinkProps = ComponentProps<'a'> & { children: ReactNode }

/** Главная кнопка: высота 48, r8; hover — светлее и стрелка на 4 вправо (DESIGN.md §5). */
export function ButtonPrimary({ className = '', children, ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={`group inline-flex h-12 items-center justify-center gap-4 rounded-8 bg-accent-yellow pr-6 pl-8 type-button whitespace-nowrap text-text-primary transition-colors duration-150 ease-out hover:bg-accent-yellow-hover active:bg-accent-yellow-pressed ${className}`}
    >
      {children}
      <Icon
        name="arrow-right"
        className="transition-transform duration-150 ease-out group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
      />
    </a>
  )
}

/** «Подробнее» в карточке кейса: полоса + круг, вся кнопка — одна ссылка. */
export function ButtonMore({ className = '', children, ...props }: LinkProps) {
  const part =
    'bg-bg-navy transition-colors duration-150 ease-out group-hover:bg-accent-blue group-active:bg-accent-blue-pressed'
  return (
    <a
      {...props}
      className={`group flex h-10 rounded-8 type-button-s text-text-inverse ${className}`}
    >
      <span className={`flex flex-1 items-center justify-center rounded-8 ${part}`}>
        {children}
      </span>
      <span className={`flex size-10 items-center justify-center rounded-full ${part}`}>
        <Icon name="chevron-right" />
      </span>
    </a>
  )
}
