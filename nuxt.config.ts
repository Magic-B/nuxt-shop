// https://nuxt.com/docs/api/configuration/nuxt-config

import { Routes } from "./types/routes";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui'],
  css: ['~/assets/css/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/css/mixins/variables.scss";
            @import "~/assets/css/mixins/screen.scss";
          `
        }
      }
    }
  },
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
  },
  routeRules: {
    [Routes.PROFILE]: {
      ssr: false
    }
  }
})