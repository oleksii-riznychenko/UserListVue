<template>
  <div class="layout">
    <header-main />
    <main-container :class-container="props.classContainer">
      <slot />
    </main-container>
    <footer-main />
    <loader-ui :loading="props.loading" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import LoaderUi from '@/components/LoaderUi/LoaderUi.vue';
import HeaderMain from '../Header/HeaderMain.vue';
import FooterMain from '../Footer/FooterMain.vue';
import MainContainer from '../Main/MainContainer.vue';
import { ILayoutMainProps } from './LayoutMain.types';

const props = defineProps<ILayoutMainProps>();
</script>

<style lang="scss" scoped>
@import './LayoutMain.scss';
</style>
