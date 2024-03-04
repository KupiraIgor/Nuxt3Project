import { defineStore } from 'pinia';
import type { Token } from '~/stores/types';

export const useTokenStore = defineStore('token', () => {
  const token = ref<string>('');

  const setToken = (data: string) => (token.value = data);
  const fetchToken = async () => {
    if (token) {
      try {
        const res = await $fetch<Token>('https://frontend-test-assignment-api.abz.agency/api/v1/token');
        setToken(res.token);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return { fetchToken, token };
});
