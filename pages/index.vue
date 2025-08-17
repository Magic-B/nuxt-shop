<template>
  <div class="products-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @navigate="(id) => navigateTo(Routes.PRODUCT(id))"
    />
  </div>
</template>

<script setup lang="ts">
import { Routes } from '~/types/routes';

const { $repos } = useNuxtApp()
const route = useRoute()

const { data } = await useAsyncData('products', () => $repos.products.getProducts())

const products = computed(() => {
  if (!route.query.q) return data.value ?? []
  return (data.value ?? []).filter((product) => product.title.toLowerCase().includes(String(route.query.q).toLowerCase()))
})
</script>

<style lang="scss" scoped>
.products-list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.product-card {
  width: 100%;
}
</style>
