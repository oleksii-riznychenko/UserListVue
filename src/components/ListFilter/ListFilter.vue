<template>
  <div class="list-filter">
    <form
      novalidate
      class="filter-user-form"
      @submit="onSubmit"
    >
      <div class="filter-user-form__body">
        <div class="input-container">
          <label for="first_name">First name</label>
          <input type="text" name="first_name" id="first_name" v-model="first_name.value.value" />
          <span>{{errors.first_name}}</span>
        </div>
        <div class="input-container">
          <label for="last_name">Last name</label>
          <input type="text" name="last_name" id="last_name" v-model="last_name.value.value" />
          <span>{{errors.last_name}}</span>
        </div>
        <div class="input-container">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model="email.value.value" />
          <span>{{errors.email}}</span>
        </div>
      </div>
      <div class="filter-user-form__action">
        <button-ui
          class="button-ui--default"
          @click="handleClose"
        >
          Reset
        </button-ui>
        <button-ui type="submit" class="button-ui--default">
          Search
        </button-ui>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  computed, defineEmits, defineProps, watch,
} from 'vue';
import { object, string } from 'yup';
import { useField, useForm } from 'vee-validate';
import ButtonUi from '@/components/ButtonUi/ButtonUi.vue';
import { IListFilterForm } from '@/components/ListFilter/ListFilter.types';
import { IUserListProps } from '@/components/UserList/UserList.types';

interface IEmit {
  (e: 'change-form', data: IListFilterForm): void;
}

const props = defineProps<IUserListProps>();
const emits = defineEmits<IEmit>();

const {
  handleSubmit, errors, setValues, resetForm,
} = useForm({
  initialValues: {
    email: '',
    last_name: '',
    first_name: '',
  } as IListFilterForm,
  validationSchema: object().shape({
    email: string(),
    last_name: string(),
    first_name: string(),
  }),
  validateOnMount: false,
});

const email = useField<IListFilterForm['email']>('email');
const last_name = useField<IListFilterForm['last_name']>('last_name');
const first_name = useField<IListFilterForm['first_name']>('first_name');

const handleClose = computed(() => (): void => {
  resetForm();
});

const onSubmit = handleSubmit((values) => {
  emits('change-form', values);
});

watch(() => props.initialValues, () => {
  if (props.initialValues) setValues(props.initialValues);
});
</script>

<style lang="scss">
@import "ListFilter.scss";
</style>
