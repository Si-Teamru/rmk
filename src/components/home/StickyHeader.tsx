'use client'

/**
 * Закреплённая шапка — Header Bar 3045:439 (Scroll=Top/Pinned). Pinned: линия 1 px border-subtle снизу.
 * «Закреплена» = маркер над шапкой ушёл за верх окна (IntersectionObserver). CSS scroll-state(stuck)
 * пока только в Chrome — этот путь работает везде. Линия — внутренняя тень: высота шапки не меняется.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function StickyHeader({ className, children }: { className: string; children: ReactNode }) {
  const marker = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPinned(!e.isIntersecting))
    io.observe(marker.current!)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div ref={marker} aria-hidden className="-mb-px h-px" />
      <header
        data-pinned={pinned || undefined}
        className={`${className} transition-shadow duration-150 ease-out data-pinned:shadow-[inset_0_-1px_0_var(--border-subtle)]`}
      >
        {children}
      </header>
    </>
  )
}
