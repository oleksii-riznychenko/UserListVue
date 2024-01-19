<template>
  <footer class="footer">
    <p>Created by <strong>Oleksii Riznychenko</strong></p>
    <span>{{ year }}</span>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const year = ref<number>(new Date().getFullYear());
</script>

<style lang="scss">
@import "./FooterMain.scss";
</style>
