import type { NextConfig } from 'next'

/**
 * STATIC_EXPORT=1 — статическая сборка для GitHub Pages (.github/workflows/pages.yml):
 * без сервера, в подпапке NEXT_PUBLIC_BASE_PATH, без оптимизации картинок.
 * Картинки из public — через asset() (src/lib/asset.ts): next/image сам basePath не добавляет.
 */
const staticExport = process.env.STATIC_EXPORT === '1'

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: 'export',
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
        trailingSlash: true,
      }
    : { output: 'standalone' }),
  images: { unoptimized: staticExport },
}

export default nextConfig
