export const priceFormat = (price: number) => {
  if (!price) return;

  return price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'USD',
  })
}
