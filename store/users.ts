import { useTokenStore } from './token';
export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    totalPages: 0,
    currentPage: 1,
  }),
  actions: {
    async fetchUsers() {
      const { token } = useTokenStore();
      const { data }: any = await useFetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        headers: {
          Token: token,
        },
        query: {
          count: 6,
        },
      });
      this.users = data.value.users;
      this.totalPages = data.value.total_pages;
    },
    async fetchMoreUsers() {
      const { token } = useTokenStore();
      const { data }: any = await useFetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        headers: {
          Token: token,
        },
        query: {
          page: this.currentPage,
          count: 6,
        },
      });
      this.users = this.users.concat(data.value.users);
    },

    setNextPage() {
      this.currentPage++;
    },
    resetPages() {
      this.currentPage = 0;
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getTotalPages(state) {
      return state.totalPages;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
  },
});
