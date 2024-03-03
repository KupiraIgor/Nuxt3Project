export const useTokenStore = defineStore('token', {
  state: () => ({
    token: 0,
  }),
  actions: {
    async fetchToken() {
      const { data }: any = await useFetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
      this.token = data.value.token;
    },
  },
});
