// Заглушка до вёрстки главной: проверка шрифтов, токенов и выкладки на Pages.
export default function Home() {
  return (
    <main className="grid min-h-dvh place-content-center gap-6 bg-bg-navy px-container-padding text-text-inverse">
      <h1 className="type-display uppercase">
        Сайт <span className="text-accent-yellow">РМК</span> в&nbsp;разработке
      </h1>
      <p className="type-lead">Росмедконсалтинг</p>
    </main>
  )
}
