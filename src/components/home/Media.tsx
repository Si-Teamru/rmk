/**
 * «Постоянные эксперты в СМИ»: desktop 3015:1115, mobile 3020:530.
 * Логотипы — один SVG из Figma (Media Logos 3011:1048), пока клиент не прислал файлы изданий.
 */
import { home } from '@/data/home'
import { asset } from '@/lib/asset'

export function Media() {
  return (
    <section className="flex flex-col items-center gap-3 px-container-padding pt-5 pb-6 md:flex-row md:justify-end md:gap-2 md:pt-4 md:pb-8">
      <p className="type-caption-display">{home.media.caption}</p>
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG, оптимизация не нужна */}
      <img
        src={asset('/images/media-logos.svg')}
        width={326}
        height={18}
        alt={home.media.alt}
        loading="lazy"
      />
    </section>
  )
}
