// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui'],
  css: ['~/assets/css/global.scss'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    }
  }
})