import { ofetch } from 'ofetch'
import { makeRepos } from '~/api/repos'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const $api = ofetch.create({
    baseURL: config.public.apiUrl as string,
    onRequest({ options }) {
      // Здесь можно добавить токен авторизации и другие заголовки, но в этом проекте нет авторизации
    },
    onResponse({ response }) {
      // Здесь можно добавить логирование ответов
    },
    onResponseError({ response }) {
      // Здесь можно добавить обработку ошибок
    },
  })

  const $repos = makeRepos($api)
  return { provide: { api: $api, repos: $repos } }
})