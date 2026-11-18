import type { Metadata, Viewport } from 'next'
import React from 'react'

import { hauora, unbounded } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'РМК — Росмедконсалтинг',
  // Витрина на GitHub Pages — для клиента, не для поиска.
  ...(process.env.STATIC_EXPORT === '1' ? { robots: { index: false, follow: false } } : {}),
}

// Тёмной темы в макете нет: формы и полосы прокрутки браузера — светлые.
export const viewport: Viewport = { colorScheme: 'light' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${hauora.variable} ${unbounded.variable} scroll-pt-16 xl:scroll-pt-19`}
    >
      <body>{children}</body>
    </html>
  )
}
