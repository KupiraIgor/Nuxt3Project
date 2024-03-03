<script setup lang="ts">
const onScrollToSingUp = () => {
  const el = document.querySelector('#post-section');
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth',
    });
  }
};

const onScrollToUsers = () => {
  const el = document.querySelector('#get-section');
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth',
    });
  }
};
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <NuxtLink class="header__logo" to="/">
          <img src="/logo.svg" alt="" />
        </NuxtLink>
        <div class="header__buttons">
          <BaseButton @click="onScrollToUsers">Users</BaseButton>
          <BaseButton @click="onScrollToSingUp">Sign up</BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 1.3rem 0;
  background-color: var(--color-white);

  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    img {
      width: 10.4rem;
      height: 2.6rem;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>
