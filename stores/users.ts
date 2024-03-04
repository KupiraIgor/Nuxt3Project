import { defineStore } from 'pinia';
import { useTokenStore } from '~/stores/token';
import type { ResUser, User, Users } from '~/stores/types';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const totalPages = ref<number>(0);
  const currentPage = ref<number>(1);

  const setUsers = (data: User[]) => (users.value = data);
  const setMoreUsers = (data: User[]) => (users.value = users.value.concat(data));
  const setTotalPages = (data: number) => (totalPages.value = data);

  const setNextPage = () => {
    currentPage.value++;
  };

  const resetPages = () => {
    currentPage.value = 0;
  };
  const fetchUsers = async () => {
    const { token }: { token: string } = useTokenStore();

    try {
      const res = await $fetch<Users>('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        headers: {
          Token: token,
        },
        query: {
          count: 6,
        },
      });

      setUsers(res.users);
      setTotalPages(res.total_pages);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMoreUsers = async () => {
    const { token }: { token: string } = useTokenStore();

    try {
      const res = await $fetch<Users>('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        headers: {
          Token: token,
        },
        query: {
          page: currentPage.value,
          count: 6,
        },
      });

      setMoreUsers(res.users);
    } catch (e) {
      console.log(e);
    }
  };

  const sendUser = async (data: any) => {
    const { token }: { token: string } = useTokenStore();

    const formSend = new FormData();
    formSend.append('name', data.name);
    formSend.append('email', data.email);
    formSend.append('phone', data.phone);
    formSend.append('position_id', data.position_id);
    formSend.append('photo', data.photo);

    try {
      const res: ResUser = await $fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        method: 'post',
        body: formSend,
        headers: {
          Token: token,
        },
      });

      await fetchUsers();
      resetPages();

      return res;
    } catch (e: any) {
      return {
        success: false,
        status: e.response.status,
        message: e.response._data.message,
      };
    }
  };

  return { fetchUsers, fetchMoreUsers, setNextPage, resetPages, sendUser, users, totalPages, currentPage };
});
