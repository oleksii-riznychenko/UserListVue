<template>
  <main class="main">
    <div class="main__container" :class="props.classContainer || ''">
      <slot />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { IMainContainerProps } from './MainContainer.types';

const props = defineProps<IMainContainerProps>();
</script>

<style lang="scss">
@import "./MainContainer.scss";
</style>
