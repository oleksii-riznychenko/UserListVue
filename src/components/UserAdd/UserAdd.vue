<template>
  <div>
    <button-ui
      class="button-ui--icon"
      @click="handleUpdateModalStatus(true)"
    >
      <add-icon :size="25" class="icon"/>
    </button-ui>
    <modal-ui :is-modal-open="modalStatus" @modal-close="handleUpdateModalStatus(false)">
      <form
        novalidate
        class="add-user-form"
        @submit="onSubmit"
      >
        <div class="add-user-form__body">
          <h3>Create user</h3>
          <div class="add-user-form__row input-container">
            <label for="first_name">User first name</label>
            <input type="text" name="first_name" id="first_name" v-model="first_name.value.value" />
            <span>{{errors.first_name}}</span>
          </div>
          <div class="add-user-form__row input-container">
            <label for="last_name">User last name</label>
            <input type="text" name="last_name" id="last_name" v-model="last_name.value.value" />
            <span>{{errors.last_name}}</span>
          </div>
          <div class="add-user-form__row input-container">
            <label for="email">User email</label>
            <input type="email" name="email" id="email" v-model="email.value.value" />
            <span>{{errors.email}}</span>
          </div>
        </div>
        <div class="add-user-form__actions">
          <button-ui
            class="button-ui--default"
            @click="handleUpdateModalStatus(false)"
          >
            Close
          </button-ui>
          <button-ui type="submit" class="button-ui--default">
            Send
          </button-ui>
        </div>
      </form>
    </modal-ui>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits } from 'vue';
import { object, string } from 'yup';
import { useField, useForm } from 'vee-validate';
import ButtonUi from '@/components/ButtonUi/ButtonUi.vue';
import AddIcon from 'vue-material-design-icons/Plus.vue';
import ModalUi from '@/components/ModalUi/ModalUi.vue';
import { IAddUserData } from '@/models/UserData';
import { useStore } from 'vuex';

interface IEmit {
  (e: 'loader-status', status: boolean): void;
}

const emit = defineEmits<IEmit>();

const modalStatus = ref<boolean>(false);

const store = useStore();

const { handleSubmit, errors, resetForm } = useForm({
  initialValues: {
    email: '',
    last_name: '',
    first_name: '',
  } as IAddUserData,
  validationSchema: object().shape({
    last_name: string().required(),
    first_name: string().required(),
    email: string().email().required(),
  }),
  validateOnMount: false,
});

const first_name = useField<IAddUserData['first_name']>('first_name');
const last_name = useField<IAddUserData['last_name']>('last_name');
const email = useField<IAddUserData['email']>('email');

const handleUpdateModalStatus = computed(() => (status: boolean): void => {
  if (!status) resetForm();

  modalStatus.value = status || false;
});

const onSubmit = handleSubmit((values) => {
  emit('loader-status', true);

  store.dispatch('users/addUser', values)
    .finally(() => {
      handleUpdateModalStatus.value(false);
      emit('loader-status', false);
    });
});
</script>

<style lang="scss">
@import './UserAdd.scss';
</style>
