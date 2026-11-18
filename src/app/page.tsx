import { Cases } from '@/components/home/Cases'
import { Header } from '@/components/home/Header'
import { Hero } from '@/components/home/Hero'
import { Media } from '@/components/home/Media'
import { Solutions } from '@/components/home/Solutions'
import { Team } from '@/components/home/Team'

// Главная: Figma EcKBc3G43tWwM3XtI2hZwi, desktop 3015:1016, mobile 3020:479.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Media />
        <Cases />
        {/* Team + Solutions 3016:1129: тёмный фон, белая секция заходит на него скруглением */}
        <div className="overflow-clip bg-bg-navy">
          <Team />
          <Solutions />
        </div>
      </main>
    </>
  )
}
