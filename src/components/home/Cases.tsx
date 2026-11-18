/**
 * Кейсы: desktop 3015:1131, mobile 3020:546; карточка — Case Card 3014:268 (r24 = кнопка r8 + поле 16).
 * Высота по содержимому, в ряду — по самой высокой (grid). Три в ряд — от 1024.
 */
import { home } from '@/data/home'

import { ButtonMore, Rich } from '../ui'

const em = 'font-display font-medium leading-[1.2]'

export function Cases() {
  return (
    <section
      id="cases"
      className="mx-auto grid max-w-page gap-grid-gutter px-container-padding pb-section-gap lg:grid-cols-3 lg:gap-x-8"
      aria-label="Кейсы"
    >
      {home.cases.map((c, i) => (
        <article key={c.title} className="flex flex-col rounded-24 bg-bg-white shadow-card">
          <div className="flex items-center gap-4 p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-8 bg-accent-yellow type-step-number">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="type-card-title">{c.service}</p>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-4 rounded-24 bg-bg-soft p-4">
            <div className="flex flex-col gap-2">
              <h3 className="type-h4">
                {c.titleHref ? (
                  <a href={c.titleHref} className="rounded-4 underline">
                    {c.title}
                  </a>
                ) : (
                  c.title
                )}
              </h3>
              <div className="type-caption text-text-secondary">
                {c.fine && (
                  <p>
                    <span className={em}>{c.fine.label}</span>{' '}
                    <span className="font-display leading-[1.2]">
                      {/* Числа крупнее: «от 3 до 15» → 3 и 15 — Unbounded Medium 20 */}
                      {c.fine.value.split(/(\d+)/).map((part, i) =>
                        i % 2 ? (
                          <span key={i} className={`${em} text-[1.25rem]`}>
                            {part}
                          </span>
                        ) : (
                          part
                        ),
                      )}{' '}
                      <span className={em}>{c.fine.unit}</span>
                    </span>
                  </p>
                )}
                {c.text.map((t) => (
                  <p key={t}>
                    <Rich text={t} accent={em} />
                  </p>
                ))}
              </div>
            </div>
            <ButtonMore href={c.href} aria-label={`Подробнее: ${c.title}`}>
              Подробнее
            </ButtonMore>
          </div>
        </article>
      ))}
    </section>
  )
}
