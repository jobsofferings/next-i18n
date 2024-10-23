export const i18n = {
  defaultLocale: 'zh', // 默认为中文
  locales: ['zh', 'en', 'ja'], // 支持中文、英文、日文
} as const

export type Locale = (typeof i18n)['locales'][number]