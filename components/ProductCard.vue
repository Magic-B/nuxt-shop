<template>
  <q-card class="product-card">
    <div @click="emit('navigate', product.id)" class="product-card__image">
      <img :src="product.image">
    </div>

    <q-card-section>
      <div @click="emit('navigate', product.id)" class="product-card__title">{{ truncate(product.title, 35) }}</div>
      <div class="text-subtitle2">{{ priceFormat(product.price) }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { Product } from '~/types/products'
import { truncate } from '~/utils/string';
import { priceFormat } from '~/utils/price';

interface Props {
  product: Product
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'navigate', id: number): void
}>()
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
      color: var(--primary);
    }
  }
}
</style>