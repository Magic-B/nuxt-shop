<template>
  <q-layout>
    <q-header class="header">
      <q-toolbar class="header__toolbar">
        <div class="flex items-center gap-5">
          <div class="flex items-center cursor-pointer" @click="navigateTo(Routes.MAIN)">
            <q-icon size="28px" name="shopping_bag" />
            <q-toolbar-title>
              Webzone
            </q-toolbar-title>
          </div>

          <q-btn icon="window" label="Каталог" no-caps color="white" text-color="primary" />
        </div>

        <q-input class="w-100" v-model="search" bg-color="white" dense outlined placeholder="Поиск" />

        <div class="flex items-center gap-5">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to">
            <div class="flex items-center column gap-1">
              <q-icon size="20px" :name="link.icon" />
              <span class="fz-10">{{ link.label }}</span>
            </div>
          </NuxtLink>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="page-container">
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Routes } from '~/types/routes';

const links = [
  {
    label: 'Профиль',
    to: Routes.PROFILE,
    icon: 'person'
  },
  {
    label: 'Заказы',
    to: Routes.ORDERS,
    icon: 'receipt_long'
  },
  {
    label: 'Избранное',
    to: Routes.FAVORITES,
    icon: 'favorite'
  },
  {
    label: 'Корзина',
    to: Routes.CART,
    icon: 'shopping_cart'
  }
]

const search = ref('')
</script>

<style lang="scss" scoped>
.header {
  margin: 0 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  &__toolbar {
    justify-content: space-between;
    display: flex;
    align-items: center;
  }
}

.page-container {
  padding-top: 70px !important;
  padding: 0 1rem;
}
</style>