/**
 * Шапка: Header / Desktop 3014:342 (от 1280) и Header / Mobile 3019:507 (меньше 1280: меню в шапку не влезает).
 * Закреплена при прокрутке — Header Bar 3045:439, линия Pinned в StickyHeader.
 * Додумано: открытое мобильное меню не нарисовано — временное, MobileMenu.tsx.
 */
import { home } from '@/data/home'
import { asset } from '@/lib/asset'

import { Icon } from '../ui'
import { MobileMenu } from './MobileMenu'
import { StickyHeader } from './StickyHeader'

const { nav, phone, signUp } = home.header

export function Header() {
  return (
    <StickyHeader className="sticky top-0 z-50 bg-bg-white py-1 xl:pt-3 xl:pb-2">
      <div className="mx-auto flex h-14 max-w-page items-center justify-between gap-4 px-wide-padding">
        <a href={asset('/')} className="shrink-0 rounded-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG логотипа, оптимизация не нужна */}
          <img
            src={asset('/images/logo.svg')}
            width={262}
            height={46}
            alt="Росмедконсалтинг — медицинское право"
          />
        </a>

        <nav aria-label="Основное меню" className="hidden xl:block">
          <ul className="flex gap-4 min-[1440px]:gap-6">
            {nav.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="rounded-4 type-nav-link whitespace-nowrap transition-colors duration-150 ease-out hover:text-accent-blue"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 gap-1 rounded-8 bg-bg-navy p-1 xl:flex">
          <a
            href={phone.href}
            className="flex h-10 items-center rounded-4 px-4 type-button-s whitespace-nowrap text-text-inverse transition-colors duration-150 ease-out hover:text-accent-yellow"
          >
            {phone.label}
          </a>
          <a
            href={signUp.href}
            className="flex h-10 items-center rounded-4 bg-accent-yellow px-4 type-button-s text-text-primary transition-colors duration-150 ease-out hover:bg-accent-yellow-hover active:bg-accent-yellow-pressed"
          >
            {signUp.label}
          </a>
        </div>

        <button
          type="button"
          popoverTarget="menu"
          aria-label="Меню"
          className="flex size-12 items-center justify-center rounded-4 bg-bg-navy text-text-inverse transition-colors duration-150 ease-out hover:bg-accent-blue active:bg-accent-blue-pressed xl:hidden"
        >
          <Icon name="menu" />
        </button>
      </div>

      <MobileMenu />
    </StickyHeader>
  )
}
