<template>
  <div class="user-list-item" @click="handleUpdateModalStatus(true)">
    <div class="user-list-item__body">
      <div class="user-list-item__avatar">
        <img
          v-if="props.userData.avatar"
          :src="props.userData.avatar"
          :alt="props.userData.first_name"
        />
        <face-man-icon v-else :size="25" class="icon"/>
      </div>
      <div class="user-list-item__content">
        <h3>{{props.userData.last_name}} {{props.userData.first_name}}</h3>
        <p>{{props.userData.email}}</p>
      </div>
    </div>
    <div class="user-list-item__actions">
      <button-ui
        class="button-ui--icon"
        @click.stop="handleRemoveUser"
      >
        <remove-icon :size="25" class="icon"/>
      </button-ui>
      <modal-ui :is-modal-open="modalStatus" @modal-close="handleUpdateModalStatus(false)">
        <user-details
          :userData="props.userData"
          @loader-status="$emit('loader-status', $event)"
          @reset-form="handleUpdateModalStatus(false)"
        />
      </modal-ui>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed, defineProps, defineEmits, ref,
} from 'vue';
import ButtonUi from '@/components/ButtonUi/ButtonUi.vue';
import RemoveIcon from 'vue-material-design-icons/TrashCan.vue';
import FaceManIcon from 'vue-material-design-icons/FaceMan.vue';
import { IUserData } from '@/models/UserData';
import ModalUi from '@/components/ModalUi/ModalUi.vue';
import UserDetails from '@/components/UserDetails/UserDetails.vue';
import { IUserListItemProps } from './UserListItem.types';

interface IEmit {
  (e: 'loader-status', status: boolean): void;
  (e: 'click:remove', id: IUserData['id']): void;
}

const props = defineProps<IUserListItemProps>();
const emit = defineEmits<IEmit>();

const modalStatus = ref<boolean>(false);

const handleRemoveUser = computed(() => () => {
  emit('click:remove', props.userData.id);
});

const handleUpdateModalStatus = computed(() => (status: boolean): void => {
  modalStatus.value = status || false;
});

</script>

<style lang="scss">
@import './UserListItem.scss';
</style>
