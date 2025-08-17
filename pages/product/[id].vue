<template>
  <div v-if="product" class="product-page">
    <div class="product-page__product">
      <div class="product-page__product-image">
        <img :src="product?.image" :alt="product?.title" />
      </div>
      <div class="product-page__product-content">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>

        <div class="product-page__product-about">
          <div class="product-page__product-about-item">
            <span>Тип</span>
            <span>{{ product.category }}</span>
          </div>
          <div class="product-page__product-about-item">
            <span>Страна-изготовитель</span>
            <span>Россия</span>
          </div>
          <div class="product-page__product-about-item">
            <span>Цвет</span>
            <span>На любой вкус</span>
          </div>
        </div>
      </div>
    </div>

    <div class="product-page__actions">
      <div class="product-page__actions-price">
        <span>{{ priceFormat(product.price - (product.price * 0.2)) }}</span>
        <span>{{ priceFormat(product.price) }}</span>
      </div>
      <div class="product-page__actions-discount">
        <span>скидка 20% на первый заказ</span>
      </div>
      <div class="product-page__actions-buttons">
        <q-btn
          color="primary"
          class="product-page__actions-button"
          label="Заказать в один клик"
          no-caps
          :loading="loading"
          @click="handleOrderClick"
        />
        <div class="product-page__actions-buttons-double">
          <q-btn
            class="product-page__actions-button"
            label="Добавить в корзину"
            outline
            no-caps
            @click="handleAddToCart"
          />
          <q-checkbox
            v-model="isFavorite"
            checked-icon="favorite"
            unchecked-icon="favorite_border"
            color="primary"
            size="54px"
            class="product-page__actions-button"
            @click="handleAddToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar'

const { $repos } = useNuxtApp()
const route = useRoute()
const isFavorite = ref(false)
const loading = ref(false)

const { data: product, error } = await useAsyncData(
  'product',
  async () => await $repos.products.getProduct(route.params.id as string)
)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode ?? 404,
    statusMessage: error.value.statusMessage ?? 'Product not found',
  })
}

const handleOrderClick = async () => {
  loading.value = true
  await sleep(3000)
  Dialog.create({
    title: 'Успшно',
    message: 'Спасибо за покупку!',
    color: 'primary',
  })
  loading.value = false
}

const handleAddToCart = () => {
}
</script>

<style lang="scss" scoped>
.product-page {
  display: flex;
  justify-content: center;
  gap: 20px;

  &__product {
    display: flex;
    gap: 20px;

    &-image {
      min-width: 500px;
      height: 680px;
      border-radius: 10px;
      border: 5px solid var(--primary);
      padding: 10px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 18px;
      line-height: 24px;
    }

    &-about {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &-item {
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid #ccc;

        & > :nth-child(1) {
          color: var(--primary);
          width: 50%;
        }

        & > :nth-child(2) {
          width: 50%;
          border-bottom: none;
        }
      }
    }
  }

  &__actions {
    min-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;

    &-price {
      display: flex;
      align-items: flex-end;
      gap: 15px;

      span {
        font-size: 26px;
        transition: all ease-in-out 0.3s;
      }

      span:nth-child(2) {
        text-decoration: line-through;
        color: #a3a4a7;
        font-size: 22px;
        font-weight: 400;
      }
    }

    &-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &-double {
        display: flex;
        align-items: center;
        gap: 10px;

        :nth-child(1) {
          flex: 1;
        }
      }
    }
  }
}
</style>