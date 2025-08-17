<template>
  <div class="home">
    <section class="hero">
      <div class="hero__container">
        <div class="hero__content">
          <div class="hero__text">
            <h1 class="hero__title">
              Добро пожаловать в <span class="hero__brand">Webzone</span>
            </h1>
            <p class="hero__subtitle">
              Откройте для себя лучшие товары по выгодным ценам. 
              Качество, которому можно доверять.
            </p>
            <div class="hero__actions">
              <q-btn
                color="primary"
                size="lg"
                icon="shopping_cart"
                label="Начать покупки"
                unelevated
                no-caps
                class="hero__btn"
                @click="scrollToProducts"
              />
              <q-btn
                color="white"
                size="lg"
                icon="info"
                label="Узнать больше"
                outline
                no-caps
                class="hero__btn"
              />
            </div>
          </div>
          <div class="hero__image">
            <q-icon name="shopping_bag" size="200px" color="white" />
          </div>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="stats__container">
        <div class="stats__grid">
          <div class="stats__item">
            <q-icon name="inventory" color="primary" size="32px" />
            <div class="stats__content">
              <span class="stats__number">{{ products.length }}+</span>
              <span class="stats__label">Товаров</span>
            </div>
          </div>
          <div class="stats__item">
            <q-icon name="people" color="positive" size="32px" />
            <div class="stats__content">
              <span class="stats__number">10K+</span>
              <span class="stats__label">Покупателей</span>
            </div>
          </div>
          <div class="stats__item">
            <q-icon name="star" color="amber" size="32px" />
            <div class="stats__content">
              <span class="stats__number">4.9</span>
              <span class="stats__label">Рейтинг</span>
            </div>
          </div>
          <div class="stats__item">
            <q-icon name="local_shipping" color="orange" size="32px" />
            <div class="stats__content">
              <span class="stats__number">24/7</span>
              <span class="stats__label">Доставка</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="products" ref="productsSection">
      <div class="products__container">
        <div class="products__header">
          <h2 class="products__title">Наши товары</h2>
          <p class="products__subtitle">
            Широкий ассортимент качественных товаров для вас
          </p>
        </div>

        <div class="products__filters" v-if="hasSearchQuery">
          <q-chip
            icon="search"
            color="primary"
            text-color="white"
            removable
            @remove="clearSearch"
          >
            Поиск: "{{ route.query.q }}"
          </q-chip>
        </div>

        <div class="products__grid" v-if="products.length">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @navigate="(id) => navigateTo(Routes.PRODUCT(id))"
            class="products__card"
          />
        </div>

        <div class="products__empty" v-else>
          <q-icon name="search_off" size="80px" color="grey-6" />
          <h3 class="products__empty-title">Товары не найдены</h3>
          <p class="products__empty-text">
            Попробуйте изменить параметры поиска или просмотрите все товары
          </p>
          <q-btn
            color="primary"
            icon="refresh"
            label="Сбросить фильтры"
            unelevated
            no-caps
            @click="clearSearch"
          />
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="cta__container">
        <q-card class="cta__card">
          <q-card-section class="cta__content">
            <div class="cta__text">
              <h3 class="cta__title">Готовы начать покупки?</h3>
              <p class="cta__subtitle">
                Присоединяйтесь к тысячам довольных покупателей
              </p>
            </div>
            <div class="cta__actions">
              <q-btn
                color="primary"
                size="lg"
                icon="person_add"
                label="Создать аккаунт"
                unelevated
                no-caps
                @click="navigateTo(Routes.PROFILE)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Routes } from '~/types/routes';

const { $repos } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const productsSection = ref<HTMLElement>()

const { data } = await useAsyncData('products', () => $repos.products.getProducts())

const products = computed(() => {
  if (!route.query.q) return data.value ?? []
  return (data.value ?? []).filter((product) => product.title.toLowerCase().includes(String(route.query.q).toLowerCase()))
})

const hasSearchQuery = computed(() => Boolean(route.query.q))

const scrollToProducts = () => {
  if (productsSection.value) {
    productsSection.value.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const clearSearch = () => {
  router.push({ query: {} })
}

watch(() => route.query, (value) => {
  if (value.q) {
    scrollToProducts()
  }
})
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, var(--primary) 0%, var(--purple-light) 100%);
  padding: 4rem 0;
  color: white;

  @include tablet {
    padding: 3rem 0;
  }

  @include mobile {
    padding: 2rem 0;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @include mobile {
      padding: 0 1rem;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 4rem;

    @include tablet {
      flex-direction: column;
      text-align: center;
      gap: 2rem;
    }
  }

  &__text {
    flex: 1;
  }

  &__title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;

    @include tablet {
      font-size: 2.5rem;
    }

    @include mobile {
      font-size: 2rem;
    }
  }

  &__brand {
    color: var(--green-light);
    text-shadow: 0 0 20px rgba(5, 255, 0, 0.3);
  }

  &__subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 2rem;
    line-height: 1.6;

    @include mobile {
      font-size: 1rem;
    }
  }

  &__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    @include mobile {
      justify-content: center;
    }
  }

  &__btn {
    padding: 0.75rem 2rem;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
  }

  &__image {
    flex: 0 0 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    @include tablet {
      flex: none;
    }

    @include mobile {
      display: none;
    }
  }
}

.stats {
  padding: 4rem 0;
  background: var(--gray-background);

  @include tablet {
    padding: 3rem 0;
  }

  @include mobile {
    padding: 2rem 0;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @include mobile {
      padding: 0 1rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mobile {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  &__item {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--border-color-gray);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    @include mobile {
      padding: 1.5rem;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--black);
    line-height: 1;
  }

  &__label {
    font-size: 0.9rem;
    color: var(--gray);
    margin-top: 0.25rem;
  }
}

.products {
  padding: 4rem 0;

  @include tablet {
    padding: 3rem 0;
  }

  @include mobile {
    padding: 2rem 0;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @include mobile {
      padding: 0 1rem;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 3rem;

    @include mobile {
      margin-bottom: 2rem;
    }
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--black);
    margin-bottom: 1rem;

    @include tablet {
      font-size: 2rem;
    }

    @include mobile {
      font-size: 1.75rem;
    }
  }

  &__subtitle {
    font-size: 1.1rem;
    color: var(--gray);
    max-width: 600px;
    margin: 0 auto;

    @include mobile {
      font-size: 1rem;
    }
  }

  &__filters {
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;

    @include tablet {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }

    @include mobile {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
    }
  }

  &__card {
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }

  &__empty {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--gray-background);
    border-radius: 16px;
    border: 1px solid var(--border-color-gray);

    @include mobile {
      padding: 2rem 1rem;
    }
  }

  &__empty-title {
    font-size: 1.5rem;
    color: var(--black);
    margin: 1rem 0 0.5rem 0;
  }

  &__empty-text {
    color: var(--gray);
    margin-bottom: 2rem;
    font-size: 1rem;
  }
}

.cta {
  padding: 4rem 0;
  background: var(--gray-background);

  @include tablet {
    padding: 3rem 0;
  }

  @include mobile {
    padding: 2rem 0;
  }

  &__container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;

    @include mobile {
      padding: 0 1rem;
    }
  }

  &__card {
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-color-gray);
    background: linear-gradient(135deg, white 0%, var(--gray-background) 100%);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3rem;

    @include tablet {
      flex-direction: column;
      text-align: center;
      gap: 2rem;
      padding: 2rem;
    }

    @include mobile {
      padding: 1.5rem;
    }
  }

  &__text {
    flex: 1;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--black);
    margin-bottom: 0.5rem;

    @include mobile {
      font-size: 1.5rem;
    }
  }

  &__subtitle {
    font-size: 1rem;
    color: var(--gray);
    margin: 0;
  }

  &__actions {
    flex-shrink: 0;
  }
}
</style>
