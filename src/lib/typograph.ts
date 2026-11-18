/**
 * Типограф (как в Тильде): неразрывные пробелы и дефисы, чтобы строки не рвались неудачно.
 * - короткие слова (1–2 буквы) и предлоги «для, без, под…» — к следующему слову;
 * - частицы «же, ли, бы» и тире — к предыдущему;
 * - инициалы «А. С. Пушкин», разряды «1 500 000», число и слово «5 лет», «№ 3»;
 * - слова через дефис («дизайн-проект») не разрываются;
 * Одно слово в последней строке не оставляем через `text-wrap: pretty` в globals.css: склейка
 * последнего слова неразрывным пробелом выталкивала заголовки за узкую колонку.
 */
const NBSP = '\u00a0'
/** Неразрывный дефис: есть в Hauora и Unbounded (проверено 18.11.2026). */
const NBHY = '\u2011'

const SHORT = String.raw`\p{L}{1,2}|для|без|под|над|при|про|или|изо|обо|ото|что|как`

// `*` — маркер выделения `**…**` в src/data (разбирает <Rich>).
export function typograph(text: string): string {
  return (
    text
      .replace(new RegExp(String.raw`(?<=^|[\s(«"„*])(${SHORT}) +`, 'giu'), `$1${NBSP}`)
      .replace(/ +(же|ли|бы|ль|ж|б)(?=[\s.,!?;:…»)]|$)/giu, `${NBSP}$1`)
      .replace(/ +([—–])/g, `${NBSP}$1`)
      .replace(/(?<!\p{L})(\p{Lu}\.) +(?=\p{Lu})/gu, `$1${NBSP}`)
      .replace(/(\d) +(?=\d{3}(?!\d))/g, `$1${NBSP}`)
      .replace(/(\d) +(?=\p{L})/gu, `$1${NBSP}`)
      .replace(/([№§]) +(?=\d)/g, `$1${NBSP}`)
      // Только кириллица: латинские ключи вида a-b в данных не трогаем.
      .replace(/(?<=[а-яё])-(?=[а-яё])/giu, NBHY)
  )
}

/** Адреса, пути и ключи не трогаем: пробелы там значимы. SEO уходит в метатеги, там U+2011 мешает поиску. */
const SKIP = new Set(['href', 'src', 'url', 'slug', 'key', 'icon', 'seo'])
const URL_LIKE = /^(\/|[a-z]+:)/i

/** Типограф для всех строк объекта (данные страниц из CMS или src/data). */
export function typographDeep<T>(value: T): T {
  if (typeof value === 'string') return (URL_LIKE.test(value) ? value : typograph(value)) as T
  if (Array.isArray(value)) return value.map(typographDeep) as T
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype)
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, SKIP.has(k) ? v : typographDeep(v)]),
    ) as T
  return value
}
