<template>
  <q-layout>
    <q-header class="header" :class="{ 'header--scrolled': isScrolled, 'header--mobile-menu': showMobileMenu }">
      <q-toolbar class="header__toolbar">
        <div class="header__left">
          <div class="header__logo" @click="navigateTo(Routes.MAIN)">
            <q-icon class="header__logo-icon" size="32px" name="shopping_bag" />
            <div class="header__logo-text">
              <span class="header__brand">Webzone</span>
              <span class="header__tagline">Shop</span>
            </div>
          </div>

          <q-btn 
            class="header__catalog-btn" 
            icon="window" 
            label="Каталог" 
            outline 
            no-caps 
            @click="navigateTo(Routes.CATALOG)" 
          />
        </div>

        <div class="header__search">
          <q-input 
            v-model="search" 
            class="header__search-input"
            bg-color="white" 
            dense 
            outlined 
            placeholder="Поиск товаров..." 
            :debounce="500" 
            @update:model-value="handleSearch"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="grey-6" />
            </template>
            <template v-slot:append v-if="search">
              <q-icon 
                name="close" 
                color="grey-6" 
                class="cursor-pointer" 
                @click="clearSearch" 
              />
            </template>
          </q-input>
        </div>

        <div class="header__nav">
          <NuxtLink 
            v-for="link in links" 
            :key="link.to" 
            :to="link.to" 
            class="header__nav-link"
            :class="{ 'header__nav-link--active': $route.path === link.to }"
          >
            <q-icon class="header__nav-icon" size="24px" :name="link.icon" />
            <span class="header__nav-label">{{ link.label }}</span>
            <q-badge 
              v-if="link.badge" 
              :label="link.badge" 
              color="red" 
              floating 
              rounded 
            />
          </NuxtLink>
        </div>

        <div class="header__mobile">
          <q-btn 
            class="header__mobile-search" 
            icon="search" 
            flat 
            round 
            @click="toggleMobileSearch"
          />
          <q-btn 
            class="header__mobile-menu" 
            icon="menu" 
            flat 
            round 
            @click="toggleMobileMenu"
          />
        </div>
      </q-toolbar>

      <div class="header__mobile-search-panel" v-if="showMobileSearch">
        <q-input 
          v-model="search" 
          class="header__mobile-search-input"
          bg-color="white" 
          dense 
          outlined 
          placeholder="Поиск товаров..." 
          autofocus
          :debounce="500" 
          @update:model-value="handleSearch"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="grey-6" />
          </template>
          <template v-slot:append>
            <q-icon 
              name="close" 
              color="grey-6" 
              class="cursor-pointer" 
              @click="closeMobileSearch" 
            />
          </template>
        </q-input>
      </div>

      <div class="header__mobile-nav" v-if="showMobileMenu">
        <NuxtLink 
          v-for="link in links" 
          :key="link.to" 
          :to="link.to" 
          class="header__mobile-nav-link"
          @click="closeMobileMenu"
        >
          <q-icon :name="link.icon" />
          <span>{{ link.label }}</span>
          <q-badge 
            v-if="link.badge" 
            :label="link.badge" 
            color="red" 
          />
        </NuxtLink>
      </div>
    </q-header>

    <q-page-container class="page-container">
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Routes } from '~/types/routes';

const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const showMobileMenu = ref(false)
const showMobileSearch = ref(false)

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
    icon: 'shopping_cart',
    badge: '3'
  }
]

const search = ref('')

const handleSearch = (value: string | number | null) => {
  const searchValue = String(value || '')
  
  if (searchValue) {
    router.push({ path: Routes.MAIN, query: { q: searchValue } })
  } else {
    router.push({ path: Routes.MAIN })
  }
}

const clearSearch = () => {
  search.value = ''
  if (route.path === Routes.MAIN) {
    router.push({ path: Routes.MAIN })
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    showMobileSearch.value = false
  }
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  if (showMobileSearch.value) {
    showMobileMenu.value = false
  }
}

const closeMobileSearch = () => {
  showMobileSearch.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

watch(() => route.query, (value) => {
  if (!import.meta.client) {
    return
  }

  if (value.q) {
    search.value = value.q as string
  } else {
    search.value = ''
  }
})

onMounted(() => {
  if (import.meta.client) {
    search.value = route.query.q as string ?? ''
  }
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style lang="scss" scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  &--scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(15px);

    .header__toolbar {
      padding: 0.5rem 1rem;
    }

    .header__logo-icon {
      transform: scale(0.9);
    }
  }

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    transition: all 0.3s ease;
    max-width: 1400px;
    margin: 0 auto;

    @include tablet {
      padding: 0.75rem 1rem;
    }

    @include mobile {
      padding: 0.5rem 1rem;
    }
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 2rem;

    @include tablet {
      gap: 1rem;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
    }
  }

  &__logo-icon {
    color: var(--primary);
    transition: all 0.3s ease;
  }

  &__logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1;

    @include mobile {
      display: none;
    }
  }

  &__brand {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--black);
    letter-spacing: -0.5px;
  }

  &__tagline {
    font-size: 0.75rem;
    color: var(--gray);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__catalog-btn {
    border-radius: 12px;
    padding: 0.5rem 1rem;
    border-color: var(--primary);
    color: var(--primary);
    transition: all 0.3s ease;

    &:hover {
      background: var(--primary);
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(56, 113, 224, 0.3);
    }

    @include mobile {
      display: none;
    }
  }

  &__search {
    flex: 1;
    max-width: 500px;
    margin: 0 2rem;

    @include tablet {
      margin: 0 1rem;
      max-width: 300px;
    }

    @include mobile {
      display: none;
    }
  }

  &__search-input {
    border-radius: 20px;
    transition: all 0.3s ease;

    &:focus-within {
      transform: scale(1.02);
      box-shadow: 0 4px 20px rgba(56, 113, 224, 0.15);
    }

    .q-field__control {
      border-radius: 20px;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 1rem;

    @include tablet {
      display: none;
    }
  }

  &__nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.75rem;
    border-radius: 12px;
    text-decoration: none;
    color: var(--gray);
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      color: var(--primary);
      background: var(--gray-background);
      transform: translateY(-2px);
    }

    &--active {
      color: var(--primary);
      background: var(--gray-background);
    }
  }

  &__nav-icon {
    transition: all 0.3s ease;
  }

  &__nav-label {
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
  }

  &__mobile {
    display: none;
    align-items: center;
    gap: 0.5rem;

    @include tablet {
      display: flex;
    }
  }

  &__mobile-search,
  &__mobile-menu {
    color: var(--gray);
    transition: all 0.3s ease;

    &:hover {
      color: var(--primary);
      background: var(--gray-background);
    }
  }

  &__mobile-search-panel {
    padding: 1rem;
    background: white;
    border-top: 1px solid var(--border-color-gray);
    animation: slideDown 0.3s ease;
  }

  &__mobile-search-input {
    .q-field__control {
      border-radius: 12px;
    }
  }

  &__mobile-nav {
    background: white;
    border-top: 1px solid var(--border-color-gray);
    padding: 1rem 0;
    animation: slideDown 0.3s ease;
  }

  &__mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: var(--gray);
    transition: all 0.3s ease;
    position: relative;

    &:hover,
    &:active {
      background: var(--gray-background);
      color: var(--primary);
    }

    span {
      font-weight: 500;
    }
  }
}

.page-container {
  padding-top: 90px;
  min-height: 100vh;

  @include tablet {
    padding-top: 70px;
  }

  @include mobile {
    padding-top: 60px;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cursor-pointer {
  cursor: pointer;
}
</style>