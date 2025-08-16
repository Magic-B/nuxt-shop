export const Routes = {
  PRODUCTS: '/products',
  PRODUCT: (id: number) => `/products/${id}`,
} as const

export type Routes = typeof Routes[keyof typeof Routes]
