import localFont from 'next/font/local'

// Файлы собирает scripts/fonts.py (кириллица, U+2011). next/font сам подгружает их заранее
// и строит запасной шрифт с size-adjust — текст не прыгает, пока грузится веб-шрифт.
export const hauora = localFont({
  src: [
    { path: './fonts/hauora-regular.woff2', weight: '400' },
    { path: './fonts/hauora-medium.woff2', weight: '500' },
    { path: './fonts/hauora-bold.woff2', weight: '700' },
    { path: './fonts/hauora-extrabold.woff2', weight: '800' },
  ],
  variable: '--font-hauora',
  display: 'swap',
})

export const unbounded = localFont({
  src: './fonts/unbounded-variable.woff2',
  weight: '200 900',
  variable: '--font-unbounded',
  display: 'swap',
})
