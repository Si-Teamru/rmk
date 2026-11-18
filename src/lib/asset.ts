/**
 * Путь к файлу из `public` с учётом basePath.
 * Для обычного сайта basePath пустой; в статической сборке для GitHub Pages сайт живёт в
 * подпапке (`/rmk`), а `next/image` сам basePath к `src` не добавляет.
 */
export function asset(path: string) {
  if (/^https?:/.test(path)) return path // файл из хранилища CMS
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
}
