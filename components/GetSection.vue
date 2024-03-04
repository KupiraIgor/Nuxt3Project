<script setup lang="ts">
const store = useUsersStore();
const isLoading = ref<Boolean>(false);

store.fetchUsers();

const { users, totalPages, currentPage } = storeToRefs(store);

const onShowMore = async () => {
  isLoading.value = true;
  store.setNextPage();
  await store.fetchMoreUsers();
  isLoading.value = false;
};
</script>

<template>
  <section id="get-section" class="get-section">
    <Transition>
      <BaseLoader v-show="isLoading" />
    </Transition>
    <div class="container">
      <h2 class="get-section__title title">Working with GET request</h2>
      <div class="get-section__items">
        <ClientOnly>
          <BaseItemUser v-for="user of users" :key="user.id" :user="user" />
        </ClientOnly>
      </div>
      <div class="get-section__btn">
        <BaseButton v-show="totalPages > currentPage" @click="onShowMore">Show more</BaseButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.get-section {
  position: relative;
  padding: 7rem 0 7rem;

  &__title {
    margin-bottom: 5rem;
  }

  &__items {
    margin-bottom: 5rem;
    display: grid;
    grid-template-columns: repeat(3, calc(33.333% - 2rem));
    grid-gap: 3rem;
  }

  &__btn {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 1023px) {
    &__items {
      grid-template-columns: repeat(2, calc(50% - 0.8rem));
      grid-gap: 1.6rem;
    }
  }

  @media (max-width: 767px) {
    &__items {
      grid-template-columns: 1fr;
      grid-gap: 2rem;
    }
  }
}
</style>
