<template>
  <q-card class="product-card">
    <div @click="navigateToProduct(product.id)" class="product-card__image">
      <img :src="product.image">
    </div>

    <q-card-section>
      <div @click="navigateToProduct(product.id)" class="product-card__title">{{ truncate(product.title, 35) }}</div>
      <div class="text-subtitle2">{{ product.price }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { Product } from '~/types/products'
import { Routes } from '~/types/routes';
import { truncate } from '~/utils/string';

interface Props {
  product: Product
}

const props = withDefaults(defineProps<Props>(), {})

const router = useRouter()

const navigateToProduct = (id: number) => {
  router.push(Routes.PRODUCT(id))
}
</script>

<style lang="scss" scoped>
.product-card {
  &__image {
    width: 100%;
    height: 200px;
    cursor: pointer;
  }

  &__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    cursor: pointer;

    &:hover {
      color: var(--q-primary);
    }
  }
}
</style>