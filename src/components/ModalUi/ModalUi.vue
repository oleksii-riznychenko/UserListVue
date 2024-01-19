<template>
  <div
    v-if="props.isModalOpen"
    tabindex="0"
    class="modal-overlay"
    @click="handleCloseModal"
    @keydown.esc="handleCloseModal"
  >
    <div class="modal" @click.stop>
      <div class="modal__content">
        <button-ui
          class="button-ui--icon modal__close"
          @click="handleCloseModal"
        >
          <close-icon :size="25" class="icon"/>
        </button-ui>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { IModalUiProps } from '@/components/ModalUi/ModalUi.types';
import ButtonUi from '@/components/ButtonUi/ButtonUi.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';

interface IEmit {
  (e: 'modal-close'): void;
}

const props = defineProps<IModalUiProps>();
const emit = defineEmits<IEmit>();

const handleCloseModal = computed(() => () => {
  emit('modal-close');
});
</script>

<style lang="scss">
@import './ModalUi.scss';
</style>
