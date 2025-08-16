<template>
  <div class="products-list">
    <ProductCard
      v-for="product in data"
      :key="product.id"
      :product="product"
      @navigate="(id) => navigateTo(Routes.PRODUCT(id))"
    />
  </div>
</template>

<script setup lang="ts">
import { Routes } from '~/types/routes';

const { $repos } = useNuxtApp()
const { data } = await useAsyncData('products', () => $repos.products.getProducts())
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
