/**
 * Первый экран: desktop 3015:1100, mobile 3020:515. Меньше 1280 — раскладка мобильного макета
 * (визуал под кнопкой), от 1280 — визуал справа, координаты от правого края панели, как в макете 1440.
 * Градиент и размытие карты — значения макета (исключение DESIGN.md §2).
 */
import Image from 'next/image'

import { home } from '@/data/home'
import { asset } from '@/lib/asset'

import { ButtonPrimary, Rich } from '../ui'

const { title, subtitle, cta, author } = home.hero

export function Hero() {
  return (
    <section className="px-wide-padding">
      <div className="relative flex flex-col gap-6 overflow-clip rounded-24 bg-bg-navy px-panel-padding pt-8 text-text-inverse xl:min-h-84 xl:gap-8 xl:pt-9 xl:pb-8">
        <div className="relative z-10 flex flex-col gap-3 xl:max-w-[min(730px,100%_-_640px)]">
          <h1 className="type-display uppercase">
            <Rich text={title} accent="text-accent-yellow" />
          </h1>
          <p className="type-lead xl:max-w-110">{subtitle}</p>
        </div>
        <ButtonPrimary href={cta.href} className="relative z-10 w-full md:w-fit">
          {cta.label}
        </ButtonPrimary>

        <div className="relative h-75 xl:absolute xl:inset-y-0 xl:right-0 xl:h-auto xl:w-full">
          <Image
            src={asset('/images/hero-map.webp')}
            alt=""
            width={1024}
            height={439}
            loading="eager"
            className="absolute -top-2.5 -right-50.5 h-83.5 w-193.5 max-w-none object-cover object-bottom blur-[1.33px] xl:top-2.75 xl:right-5"
          />
          <div className="absolute top-0.5 right-114 hidden h-83.5 w-106.5 bg-[linear-gradient(to_right,var(--bg-navy),rgb(1_33_73/0.9)_38%,transparent)] xl:block" />
          <Image
            src={asset('/images/hero-photo.webp')}
            alt=""
            width={900}
            height={945}
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 1280px) 426px, 349px"
            className="absolute top-0.5 right-px h-74.5 w-87.25 max-w-none object-cover object-top xl:-top-7 xl:right-62 xl:h-91 xl:w-106.5"
          />
          <p className="absolute right-0 bottom-0 flex w-62 flex-col gap-1 rounded-t-16 bg-bg-navy-glass px-6 py-3 xl:right-14 xl:w-68">
            <span className="type-author">{author.name}</span>
            <span className="type-caption">{author.role}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
