// https://nuxt.com/docs/api/configuration/nuxt-config
import {process} from "std-env";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: false,

  app: {
    baseURL: './'
  },

  runtimeConfig: {
    public: {
      appVersion: process.env.APP_VERSION || '1.0.0'
    },
    appSsrDebug: process.env.APP_SSR_DEBUG || 'false',
    shikimoriApiBaseUrl: process.env.SHIKIMORI_API_BASE_URL || '/'
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/test-utils'
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
})