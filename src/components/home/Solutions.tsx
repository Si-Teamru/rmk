/**
 * «Найдите решение» + плашка «Не нашли задачу?»: desktop 3016:1176, mobile 3021:613.
 * Direction Card 3014:304 (r24 = пункт r8 + поле 16), Direction Item 3014:300 — «зебра» у чётного пункта.
 * Hover пунктов в ките не нарисован — только кольцо фокуса.
 */
import { home } from '@/data/home'

import { ButtonPrimary, Icon, Rich } from '../ui'

const { title, subtitle, directions, cta } = home.solutions

export function Solutions() {
  return (
    <section className="relative flex flex-col gap-section-gap rounded-t-48 bg-bg-white px-wide-padding pt-section-gap pb-10">
      <div className="flex flex-col gap-block-gap px-panel-padding">
        <div className="flex flex-col gap-2 md:items-center md:text-center">
          <h2 className="type-display uppercase">
            <Rich text={title} accent="text-accent-blue" />
          </h2>
          <p className="type-lead md:max-w-195">
            <Rich text={subtitle} accent="font-semibold" />
          </p>
        </div>

        <div className="grid gap-grid-gutter lg:grid-cols-3">
          {directions.map((d) => (
            <article
              key={d.title}
              className="flex flex-col overflow-clip rounded-24 bg-bg-navy shadow-card"
            >
              <div className="flex flex-col gap-2 p-6 text-text-inverse">
                <h3 className="type-h3">{d.title}</h3>
                <p className="type-body-s-medium">{d.text}</p>
              </div>
              <ul className="flex flex-1 flex-col rounded-24 bg-bg-soft p-4">
                {d.items.map((item, i) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      className={`flex items-start gap-2 rounded-8 px-2 py-4 ${i % 2 ? 'bg-bg-glass' : ''}`}
                    >
                      <span className="w-8 shrink-0 type-step-number text-accent-blue">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex flex-1 flex-col gap-1">
                        <span className="type-h4">{item.title}</span>
                        <span className="type-body-s text-text-secondary">{item.text}</span>
                      </span>
                      <Icon name="arrow-up-right" className="text-accent-blue" />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-24 bg-bg-navy px-panel-padding pt-6 pb-4 text-text-inverse md:flex-row md:items-center md:gap-6 md:rounded-16 md:py-2 md:pr-2">
        <p className="type-h3 md:whitespace-nowrap">{cta.title}</p>
        <p className="flex-1 type-body-s-medium">{cta.text}</p>
        <ButtonPrimary href={cta.button.href} className="w-full md:w-fit">
          {cta.button.label}
        </ButtonPrimary>
      </div>
    </section>
  )
}
