<template>
  <div class="list-pagination">
    <span>{{ props.currentPage }} / {{ props.totalPages }}</span>
    <button-ui
      class="button-ui--icon"
      @click="$emit('prev-page')"
      :disabled="props.currentPage === 1"
    >
      <arrow-left :size="25" class="icon"/>
    </button-ui>
    <button-ui
      class="button-ui--icon"
      @click="$emit('next-page')"
      :disabled="props.currentPage === props.totalPages"
    >
      <arrow-right :size="25" class="icon"/>
    </button-ui>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ButtonUi from '@/components/ButtonUi/ButtonUi.vue';
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue';
import ArrowRight from 'vue-material-design-icons/ArrowRight.vue';
import { IListPaginationProps } from './ListPagination.types';

const props = defineProps<IListPaginationProps>();
</script>

<style lang="scss">
@import './ListPagination.scss';
</style>
