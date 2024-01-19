<template>
  <form
    novalidate
    class="edit-user-form"
    @submit="onSubmit"
  >
    <div class="edit-user-form__body">
      <div class="edit-user-form__details">
        <h3>User Details</h3>
        <div class="edit-user-form__avatar">
          <img
            v-if="props.userData.avatar"
            :src="props.userData.avatar"
            :title="props.userData.avatar"
            :alt="props.userData.first_name"
          />
          <p v-else><strong>Avatar:</strong> No data</p>
        </div>
        <p><strong>Id:</strong> {{props.userData.id || 'No data'}}</p>
        <p><strong>First name:</strong> {{props.userData.first_name || 'No data'}}</p>
        <p><strong>Last name:</strong> {{props.userData.last_name || 'No data'}}</p>
        <p><strong>Email:</strong> {{props.userData.email || 'No data'}}</p>
      </div>
      <div class="edit-user-form__row input-container">
        <label for="phone">Phone</label>
        <input type="text" name="phone" id="phone" v-model="phone.value.value" />
        <span>{{errors.phone}}</span>
      </div>
      <div class="edit-user-form__row input-container">
        <label for="address">Address</label>
        <input type="text" name="address" id="address" v-model="address.value.value" />
        <span>{{errors.address}}</span>
      </div>
    </div>
    <div class="edit-user-form__actions">
      <button-ui
        class="button-ui--default"
        @click="handleClose"
      >
        Close
      </button-ui>
      <button-ui type="submit" class="button-ui--default">
        Update
      </button-ui>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import ButtonUi from '@/components/ButtonUi/ButtonUi.vue';
import { IUserDetailsForm, IUserDetailsProps } from '@/components/UserDetails/UserDetails.types';
import { PHONE_REGEX } from '@/utils/RegExp';

interface IEmit {
  (e: 'loader-status', status: boolean): void;
  (e: 'reset-form'): void;
}

const props = defineProps<IUserDetailsProps>();
const emits = defineEmits<IEmit>();

const store = useStore();

const { handleSubmit, errors, resetForm } = useForm({
  initialValues: {
    phone: props.userData.phone || '',
    address: props.userData.address || '',
  } as IUserDetailsForm,
  validationSchema: object().shape({
    phone: string().matches(PHONE_REGEX, 'Phone number is not valid').required(),
    address: string().min(5).required(),
  }),
  validateOnMount: false,
});

const phone = useField<IUserDetailsForm['phone']>('phone');
const address = useField<IUserDetailsForm['address']>('address');

const handleClose = computed(() => (): void => {
  resetForm();
  emits('reset-form');
});

const onSubmit = handleSubmit((values) => {
  emits('loader-status', true);

  store.dispatch('users/updateUser', { ...props.userData, ...values })
    .finally(() => {
      handleClose.value();
      emits('loader-status', false);
    });
});
</script>

<style lang="scss">
@import "./UserDetails.scss";
</style>
