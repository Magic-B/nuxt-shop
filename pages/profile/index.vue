<template>
  <div class="profile">
    <div class="profile__container">
      <div class="profile__header">
        <q-card class="profile__card">
          <q-card-section class="profile__main">
            <div class="profile__avatar-section">
              <q-avatar class="profile__avatar" size="120px">
                <img :src="data?.avatar_url" :alt="data?.login" />
              </q-avatar>
              <div class="profile__status">
                <q-icon name="verified" color="positive" size="20px" />
                <span class="profile__status-text">Верифицирован</span>
              </div>
            </div>

            <div class="profile__info">
              <h1 class="profile__name">{{ data?.name || 'Загрузка...' }}</h1>
              <p class="profile__id">ID: {{ data?.id }}</p>
              
              <div class="profile__badges">
                <q-chip 
                  color="primary" 
                  text-color="white" 
                  icon="code" 
                  size="sm"
                >
                  Разработчик
                </q-chip>
                <q-chip 
                  color="positive" 
                  text-color="white" 
                  icon="star" 
                  size="sm"
                >
                  GitHub Pro
                </q-chip>
              </div>

              <div class="profile__actions">
                <q-btn 
                  color="primary" 
                  label="Открыть профиль" 
                  unelevated 
                  no-caps
                  class="profile__btn profile__btn--edit"
                  @click="openProfile"
                />
                <q-btn 
                  color="grey-6" 
                  icon="share" 
                  flat 
                  round
                  class="profile__btn profile__btn--share"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="stats">
        <q-card class="stats__card">
          <q-card-section>
            <div class="stats__title">
              <q-icon name="analytics" color="primary" size="24px" />
              <h3 class="stats__heading">Статистика</h3>
            </div>
            <div class="stats__grid">
              <div class="stats__item">
                <q-icon name="shopping_cart" color="primary" size="20px" />
                <div class="stats__content">
                  <span class="stats__number">24</span>
                  <span class="stats__label">Заказов</span>
                </div>
              </div>
              <div class="stats__item">
                <q-icon name="favorite" color="red" size="20px" />
                <div class="stats__content">
                  <span class="stats__number">12</span>
                  <span class="stats__label">В избранном</span>
                </div>
              </div>
              <div class="stats__item">
                <q-icon name="star" color="amber" size="20px" />
                <div class="stats__content">
                  <span class="stats__number">4.8</span>
                  <span class="stats__label">Рейтинг</span>
                </div>
              </div>
              <div class="stats__item">
                <q-icon name="savings" color="green" size="20px" />
                <div class="stats__content">
                  <span class="stats__number">1,250₽</span>
                  <span class="stats__label">Сэкономлено</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="actions">
        <q-card class="actions__card" clickable @click="navigateTo('/orders')">
          <q-card-section class="actions__content">
            <q-icon name="receipt_long" color="primary" size="32px" />
            <div class="actions__text">
              <h4 class="actions__title">Мои заказы</h4>
              <p class="actions__description">Отслеживание заказов</p>
            </div>
            <q-icon name="chevron_right" color="grey-6" />
          </q-card-section>
        </q-card>

        <q-card class="actions__card" clickable @click="navigateTo('/favorites')">
          <q-card-section class="actions__content">
            <q-icon name="favorite" color="red" size="32px" />
            <div class="actions__text">
              <h4 class="actions__title">Избранное</h4>
              <p class="actions__description">Сохраненные товары</p>
            </div>
            <q-icon name="chevron_right" color="grey-6" />
          </q-card-section>
        </q-card>

        <q-card class="actions__card" clickable @click="navigateTo('/cart')">
          <q-card-section class="actions__content">
            <q-icon name="shopping_cart" color="primary" size="32px" />
            <div class="actions__text">
              <h4 class="actions__title">Корзина</h4>
              <p class="actions__description">Товары к покупке</p>
            </div>
            <q-icon name="chevron_right" color="grey-6" />
          </q-card-section>
        </q-card>

        <q-card class="actions__card" clickable>
          <q-card-section class="actions__content">
            <q-icon name="support" color="orange" size="32px" />
            <div class="actions__text">
              <h4 class="actions__title">Поддержка</h4>
              <p class="actions__description">Помощь и вопросы</p>
            </div>
            <q-icon name="chevron_right" color="grey-6" />
          </q-card-section>
        </q-card>
      </div>

      <div class="account-info">
        <q-card class="account-info__card">
          <q-card-section>
            <div class="account-info__header">
              <q-icon name="info" color="primary" size="24px" />
              <h3 class="account-info__heading">Информация аккаунта</h3>
            </div>
            <div class="account-info__grid">
              <div class="account-info__row">
                <span class="account-info__label">GitHub ID:</span>
                <span class="account-info__value">{{ data?.id }}</span>
              </div>
              <div class="account-info__row">
                <span class="account-info__label">Тип аккаунта:</span>
                <span class="account-info__value">Администратор</span>
              </div>
              <a class="account-info__row account-info__row--link" href="https://github.com/Magic-B?tab=repositories" target="_blank">
                <span class="account-info__label">Другие проекты:</span>
                <q-icon name="arrow_forward" size="20px" />
              </a>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GithubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  name: string
}

const { data } = await useFetch<GithubUser>('https://api.github.com/users/magic-b')

const openProfile = () => {
  window.open('https://github.com/Magic-B', '_blank')
}
</script>

<style lang="scss" scoped>
.profile {
  min-height: 100vh;
  padding: 2rem 0;

  &__container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @include mobile {
      padding: 0 1rem;
    }
  }

  &__card {
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--border-color-gray);
  }

  &__main {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;

    @include tablet {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
      padding: 1.5rem;
    }

    @include mobile {
      padding: 1rem;
      gap: 1rem;
    }
  }

  &__avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__avatar {
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 25px rgba(0, 85, 255, 0.5);
      transform: scale(1.05);
    }
  }

  &__status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--gray-background);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: var(--gray);
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__name {
    color: var(--black);
    margin: 0;
    font-size: 2.5rem;
    font-weight: 600;

    @include tablet {
      font-size: 2rem;
    }

    @include mobile {
      font-size: 1.75rem;
    }
  }

  &__id {
    color: var(--gray);
    margin: 0;
    font-size: 1rem;
  }

  &__badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-top: 1rem;

    @include mobile {
      justify-content: center;
      flex-wrap: wrap;
    }
  }

  &__btn {
    &--edit {
      border-radius: 12px;
      padding: 0.75rem 1.5rem;
    }
  }
}

.stats {
  &__card {
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--border-color-gray);
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  &__heading {
    margin: 0;
    color: var(--black);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mobile {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--gray-background);
    border-radius: 12px;
    border: 1px solid var(--border-color-gray);
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__number {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--black);
  }

  &__label {
    font-size: 0.9rem;
    color: var(--gray);
  }
}

.actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mobile {
    grid-template-columns: 1fr;
  }

  &__card {
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--border-color-gray);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
    }
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;

    @include mobile {
      padding: 1rem;
    }
  }

  &__text {
    flex: 1;
  }

  &__title {
    margin: 0;
    color: var(--black);
    font-size: 1.1rem;
    font-weight: 500;
  }

  &__description {
    margin: 0.25rem 0 0 0;
    color: var(--gray);
    font-size: 0.9rem;
  }
}

.account-info {
  &__card {
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--border-color-gray);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  &__heading {
    margin: 0;
    color: var(--black);
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: var(--gray-background);
    border-radius: 8px;
    border: 1px solid var(--border-color-gray);
    text-decoration: none;
    color: inherit;

    &--link {
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background: var(--gray2-background);
        transform: translateX(4px);
      }
    }
  }

  &__label {
    font-weight: 500;
    color: var(--gray);
  }

  &__value {
    font-weight: 500;
    color: var(--black);
    font-family: 'Courier New', monospace;
  }
}
</style>