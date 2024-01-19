<template>
  <div v-if="props.loading" class="loader-overlay">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ILoaderUiProps } from './LoaderUi.types';

const props = defineProps<ILoaderUiProps>();
</script>

<style lang="scss">
@import 'LoaderUi.scss';
</style>
