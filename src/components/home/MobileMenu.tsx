'use client'

/**
 * Открытое мобильное меню — в макете не нарисовано, временный список в popover (согласовать в Figma).
 * Клиентский только ради закрытия по нажатию на пункт: popover сам закрывается лишь по Esc и клику мимо.
 */
import { home } from '@/data/home'

const { nav, phone, signUp } = home.header

export function MobileMenu() {
  return (
    <nav
      onClick={(e) => (e.target as Element).closest('a') && e.currentTarget.hidePopover()}
      id="menu"
      popover="auto"
      aria-label="Основное меню"
      className="inset-x-wide-padding top-16 m-0 w-auto rounded-16 bg-bg-white p-4 text-text-primary shadow-card"
    >
      <ul className="flex flex-col">
        {nav.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="block rounded-4 py-3 type-nav-link">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-1 rounded-8 bg-bg-navy p-1">
        <a
          href={phone.href}
          className="flex h-10 items-center justify-center rounded-4 type-button-s text-text-inverse"
        >
          {phone.label}
        </a>
        <a
          href={signUp.href}
          className="flex h-10 items-center justify-center rounded-4 bg-accent-yellow type-button-s text-text-primary"
        >
          {signUp.label}
        </a>
      </div>
    </nav>
  )
}
