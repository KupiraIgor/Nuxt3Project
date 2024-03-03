<script setup>
import { useTokenStore } from '@/store/token';
const store = useTokenStore();

store.fetchToken();
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
