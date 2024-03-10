<script setup lang="ts">
import type { User } from '~/stores/types';

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
});
</script>

<template>
  <div class="item-user">
    <img class="item-user__img" :src="user.photo" alt="" />
    <div class="item-user__name" :title="user.name">
      <span>{{ user.name }}</span>
    </div>
    <div class="item-user__pos" :title="user.position">
      <span>{{ user.position }}</span>
    </div>
    <a class="item-user__mail" :href="`mailto:${user.email}`" :title="user.email">
      <span>{{ user.email }}</span>
    </a>
    <a class="item-user__phone" :href="`tel:${user.phone}`" :title="user.phone">
      <span>{{ user.phone }}</span>
    </a>
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
  &__mail,
  &__pos,
  &__phone {
    position: relative;
    width: 100%;
    min-height: 2.6rem;

    span {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      text-align: center;
    }
  }
}
</style>
