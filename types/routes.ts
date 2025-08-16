export const Routes = {
  MAIN: '/',
  PRODUCT: (id: number) => `/product/${id}`,
  PROFILE: '/profile',
  ORDERS: '/orders',
  FAVORITES: '/favorites',
  CART: '/cart',
} as const

export type Routes = typeof Routes[keyof typeof Routes]
