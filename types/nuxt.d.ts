// types/nuxt.d.ts
import type { $Fetch } from 'ofetch'
import type { makeRepos } from '~/api/repos'

declare module '#app' {
  interface NuxtApp {
    $api: $Fetch
    $repos: ReturnType<typeof makeRepos>
  }
}
export {}