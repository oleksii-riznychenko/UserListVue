<template>
  <div class="user-list">
    <list-filter :initial-values="filterFormValues" @change-form="handleChangeFilterForm" />
    <div v-if="usersList?.length">
      <user-list-item
        v-for="user of usersList"
        :key="user.id"
        :userData="user"
        @click:remove="handleRemoveUser"
        @loader-status="$emit('loader-status', $event)"
      />
    </div>
    <p v-else>No data to display...</p>
    <list-pagination
      :total-pages="totalItems"
      :current-page="currentPage"
      @prev-page="handlePrevPage"
      @next-page="handleNextPage"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed, defineEmits, onMounted, ref, watch,
} from 'vue';
import ListPagination from '@/components/ListPagination/ListPagination.vue';
import { IUserData } from '@/models/UserData';
import UserListItem from '@/components/UserListItem/UserListItem.vue';
import { useStore } from 'vuex';
import { UserListType } from '@/store/modules/users';
import ListFilter from '@/components/ListFilter/ListFilter.vue';
import { IListFilterForm } from '@/components/ListFilter/ListFilter.types';
import { IUserListProps } from '@/components/UserList/UserList.types';

interface IEmit {
  (e: 'loader-status', status: boolean): void;
}

const emit = defineEmits<IEmit>();

const totalItems = ref<number>(0);
const currentPage = ref<number>(0);
const itemsPerPage = ref<number>(0);
const usersList = ref<IUserData[] | null>(null);
const filterFormValues = ref<IUserListProps['initialValues']>(null);

const store = useStore();

const updateState = (userList: UserListType) => {
  if (userList) {
    currentPage.value = userList?.page || 1;
    usersList.value = userList?.data || null;
    itemsPerPage.value = userList?.per_page || 0;
    totalItems.value = userList?.total_pages || 0;
  }
};

const handleLoadPage = (page: number) => {
  if (!store.state.users.userList?.[String(page)]) {
    emit('loader-status', true);

    store.dispatch('users/getUsersByPage', page)
      .then(() => {
        updateState(store.state.users.userList[String(page)]);
      })
      .finally(() => emit('loader-status', false));
  } else {
    updateState(store.state.users.userList[String(page)]);
    store.commit('users/updateCurrentPage', page);
  }

  filterFormValues.value = { email: '', last_name: '', first_name: '' };
};

const handleRemoveUser = async (id: IUserData['id']) => {
  emit('loader-status', true);

  store.dispatch('users/removeUser', id)
    .finally(() => emit('loader-status', false));
};

const handlePrevPage = computed(() => () => {
  handleLoadPage(currentPage.value - 1);
});

const handleNextPage = computed(() => () => {
  handleLoadPage(currentPage.value + 1);
});

const handleChangeFilterForm = computed(() => (data: IListFilterForm) => {
  try {
    filterFormValues.value = data;

    const filter = (item: IUserData) => {
      const { email, last_name, first_name } = data;

      if (email && !item.email.toLowerCase().includes(email.toLowerCase())) {
        return false;
      }
      if (last_name && !item.last_name.toLowerCase().includes(last_name.toLowerCase())) {
        return false;
      }
      if (first_name && !item.first_name.toLowerCase().includes(first_name.toLowerCase())) {
        return false;
      }

      return true;
    };

    if (usersList.value) {
      const fullUserList: UserListType = store.state.users.userList[currentPage.value];

      if (fullUserList?.data) {
        usersList.value = fullUserList.data.filter((item) => filter(item));
      }
    }
  } catch (e) {
    console.error('Error in filter function:', e);
  }
});

onMounted(() => {
  handleLoadPage(1);
});

watch(() => store.state.users.userList, (newVal) => {
  updateState(newVal[String(currentPage.value)]);
});
</script>

<style scoped lang="scss">
@import './UserList.scss';
</style>
