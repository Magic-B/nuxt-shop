// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui'],
  css: ['~/assets/css/global.scss'],
  quasar: {
    plugins: ['Dialog'],
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    }
  },
  experimental: {
    typedPages: true,
  }
})