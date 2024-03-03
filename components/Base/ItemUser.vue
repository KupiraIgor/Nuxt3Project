<script setup lang="ts">
import type { IUser } from '~/models/IUser';

const props = defineProps({
  user: {
    type: Object as () => IUser,
    required: true,
  },
});
</script>

<template>
  <div class="item-user">
    <img class="item-user__img" :src="user.photo" alt="" />
    <div class="item-user__name" :title="user.name">{{ user.name }}</div>
    <div class="item-user__pos" :title="user.position">{{ user.position }}</div>
    <a class="item-user__mail" :href="`mailto:${user.email}`" :title="user.email">{{ user.email }}</a>
    <a class="item-user__phone" :href="`tel:${user.phone}`" :title="user.phone">{{ user.phone }}</a>
  </div>
</template>

<style lang="scss" scoped>
.item-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 1.6rem;
  padding: 2rem;

  &__img {
    border-radius: 50%;
    width: 7rem;
    height: 7rem;
    object-fit: cover;
    margin-bottom: 2rem;
  }

  &__name {
    margin-bottom: 2rem;
  }

  &__name,
  &__pos,
  &__mail,
  &__phone {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
}
</style>
