import type { $Fetch } from 'ofetch'
import { productsRepo } from './products'

export const makeRepos = ($api: $Fetch) => ({
  products: productsRepo($api),
})