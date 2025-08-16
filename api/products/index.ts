import type { $Fetch } from 'ofetch'
import type { Product } from '~/types/products'

export const productsRepo = (api: $Fetch) => ({
  getProducts: (): Promise<Product[]> => api('/products'),
  getProduct: (id: string): Promise<Product> => api(`/products/${id}`),
  addToCart: (id: string): Promise<void> => api(`/products/${id}/add-to-cart`),
})
