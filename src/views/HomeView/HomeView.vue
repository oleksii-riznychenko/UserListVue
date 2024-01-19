<template>
  <layout-main
    :loading="loading"
    class-container="home-page-container"
  >
    <div class="home-page-container__title">
      <h2>List</h2>
      <user-add @loader-status="updateLoader" />
    </div>
    <user-list @loader-status="updateLoader" />
  </layout-main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import UserList from '@/components/UserList/UserList.vue';
import LayoutMain from '@/components/layout/LayoutMain/LayoutMain.vue';
import UserAdd from '@/components/UserAdd/UserAdd.vue';

const loading = ref<boolean>(false);

const updateLoader = computed(() => (status: boolean): void => {
  loading.value = status;
});
</script>

<style lang="scss">
@import './HomeView.scss';
</style>
