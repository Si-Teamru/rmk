/**
 * «Та самая компания»: desktop 3016:1130, mobile 3021:568. Меньше 1024 — фото сверху, под ним текст
 * и карточка результата; от 1024 — фото на всю ширину с затемнением снизу и справа, текст и карточка в ряд.
 * Фото и затемнение уходят под белую секцию «Найдите решение» (видны в её скруглённых углах).
 * От 1024 фото в пропорциях макета (1406 × 764), прижато влево. Ширина — не больше той, при которой правая
 * треть фото (офис, 517 из 1406) уходит под карточку результата, как в макете 1440: на планшете фото
 * меньше, и все трое на фото слева от карточки. Правое затемнение привязано к карточке: начинается
 * за 300 px до неё и набирает полную темноту плавно под ней (в макете переход короче — на планшете был виден край).
 * Рамка фото всегда в пропорциях макета (mobile 360 × 260, от 1024 — 1406 × 764), не больше 1406 — кадр не меняется.
 * Шире 1920 фото не растягивается (max-w-page) — левый край гаснет в тёмный фон (с 1936: 1920 + полоса прокрутки 15).
 * Стрелки карточки в макете обе Disabled — кейс один, листать нечего.
 */
import Image from 'next/image'

import { home } from '@/data/home'
import { asset } from '@/lib/asset'

import { ButtonPrimary, Icon, Rich } from '../ui'

const { title, subtitle, cta, photoAlt, result: r } = home.team

function Stat({
  label,
  value,
  unit,
  accent,
}: {
  label: string
  value: string
  unit: string
  accent?: boolean
}) {
  return (
    <div
      className={`flex flex-col gap-1 md:flex-row md:items-center md:gap-4 ${accent ? 'text-accent-blue' : ''}`}
    >
      <p className="type-h4 md:w-44 md:shrink-0">{label}</p>
      <p className="flex items-baseline gap-3 whitespace-nowrap uppercase">
        <span className="type-stat-xl">{value}</span>
        <span className="type-stat-unit">{unit}</span>
      </p>
    </div>
  )
}

export function Team() {
  return (
    <section
      id="team"
      className="relative mx-auto flex w-full max-w-page flex-col gap-6 pb-12 text-text-inverse lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:px-container-padding lg:pt-18 lg:pb-16"
    >
      {/* Затемнение — значения макета (исключение DESIGN.md §2) */}
      <div className="relative aspect-[360/260] overflow-clip min-[1936px]:[mask-image:linear-gradient(to_right,transparent,#000_160px)] lg:absolute lg:top-0 lg:left-0 lg:aspect-[1406/764] lg:w-[min(1406px,(100%_-_var(--layout-container-padding)_-_470px)*1.582)]">
        <Image
          src={asset('/images/team-photo.webp')}
          alt={photoAlt}
          width={2812}
          height={1643}
          quality={90}
          loading="lazy"
          sizes="100vw"
          className="size-full object-cover object-[0_0]"
        />
        <div className="absolute inset-x-0 bottom-0 h-30 bg-[linear-gradient(to_bottom,rgb(1_33_73/0),var(--bg-navy))] lg:hidden" />
        {/* Затемнение снизу — в долях фото (макет: с 368 из 764, высота 452). На всю ширину фото, а не 956 из 1406, как
            в макете: правое затемнение мягче макетного, и край нижнего на широких экранах был виден */}
        <div className="absolute inset-x-0 top-[48%] hidden h-[59%] bg-[linear-gradient(to_bottom,rgb(1_33_73/0)_0%,rgb(1_33_73/0.35)_7.2%,var(--bg-navy)_55.8%)] lg:block" />
      </div>
      <div className="absolute top-0 right-0 hidden h-199.5 w-[calc(var(--layout-container-padding)+770px)] bg-[linear-gradient(to_right,rgb(1_33_73/0)_0px,rgb(1_33_73/0.06)_60px,rgb(1_33_73/0.2)_130px,rgb(1_33_73/0.45)_200px,rgb(1_33_73/0.72)_270px,rgb(1_33_73/0.9)_330px,var(--bg-navy)_380px)] lg:block" />

      <div className="relative flex flex-col gap-6 px-container-padding lg:max-w-194 lg:px-0">
        <h2 className="type-display uppercase">
          <Rich text={title} accent="text-accent-yellow" />
        </h2>
        <p className="type-lead lg:max-w-130">{subtitle}</p>
        <ButtonPrimary href={cta.href} className="w-full md:w-fit">
          {cta.label}
        </ButtonPrimary>
      </div>

      <div className="relative mx-container-padding mt-2 overflow-clip rounded-24 bg-bg-navy-raised lg:mx-0 lg:mt-0 lg:w-117.5 lg:shrink-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-6 py-4">
          <p className="flex flex-col items-end font-display font-medium whitespace-nowrap">
            {/* «+» 36 px — в Figma отдельного стиля нет, завести text_stat-sign */}
            <span className="leading-none uppercase">
              <span className="text-[2.25rem]">+ </span>
              <span className="type-stat-l">{r.times}</span>
            </span>
            <span className="type-h4">{r.timesUnit}</span>
          </p>
          <Icon name="arrow-up" className="text-accent-blue" />
          <p className="min-w-50 flex-1 type-label">{r.caption}</p>
        </div>

        <div className="flex flex-col gap-4 rounded-24 bg-bg-white px-2 pt-6 pb-2 text-text-primary">
          <div className="flex flex-col gap-4 px-4">
            <Stat {...r.offer} />
            <hr className="h-px border-0 bg-border-subtle" />
            <Stat {...r.total} accent />
          </div>
          <div className="flex flex-col gap-2 rounded-16 bg-bg-soft p-4">
            <p className="type-h4">{r.aboutTitle}</p>
            <p className="type-body-m">{r.about}</p>
            <div className="flex items-center justify-between pt-2">
              <a href={r.link.href} className="rounded-4 type-h4 underline">
                {r.link.label}
              </a>
              <div className="flex gap-2">
                {(['Предыдущий кейс', 'Следующий кейс'] as const).map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    disabled
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-4 border border-bg-navy text-text-primary disabled:opacity-18"
                  >
                    <Icon name="chevron-right" className={i ? '' : 'rotate-180'} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
