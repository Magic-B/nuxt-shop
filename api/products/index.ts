import type { $Fetch } from 'ofetch'

export const productsRepo = (api: $Fetch) => ({
  getProducts: () => api('/products'),
  getProduct: (id: string) => api(`/products/${id}`)
})
