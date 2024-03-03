<script setup>
import { useTokenStore } from '@/store/token';
const store = useTokenStore();

store.fetchToken();
</script>

<template>
  <div>
    <Head>
      <Title>TestTask</Title>
      <Meta name="description" content="Test task" />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
