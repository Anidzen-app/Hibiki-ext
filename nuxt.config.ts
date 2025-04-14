// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      appVersion: process.env.APP_VERSION || '1.0.0'
    },
    apiKey: process.env.API_KEY || '',
    shikimoriApiBaseUrl: process.env.SHIKIMORI_API_BASE_URL || '/'
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/test-utils',
    '@nuxtjs/i18n',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classSuffix: '-mode',
    storage: 'localStorage',
    storageKey: 'hibiki-ext-color-mode'
  },

  i18n: {
    bundle: {
      optimizeTranslationDirective: false
    },
    locales: [
      { code: 'en', iso: 'en-US', file: 'en-US.json', name: 'English' },
      { code: 'hy', iso: 'hy-AM', file: 'hy-AM.json', name: 'Հայերեն' },
      { code: 'ja', iso: 'ja-JP', file: 'ja-JP.json', name: '日本語' },
      { code: 'ru', iso: 'ru-RU', file: 'ru-RU.json', name: 'Русский' },
    ],
    lazy: false,
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
  },
})