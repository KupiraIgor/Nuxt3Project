<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <NuxtLink class="header__logo" to="/">
          <img src="/logo.svg" alt="" />
        </NuxtLink>
        <div class="header__buttons">
          <BaseButton>Users</BaseButton>
          <BaseButton>Sign up</BaseButton>
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
    width: 10.4rem;
    height: 2.6rem;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>
