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

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/test-utils'
  ]
})