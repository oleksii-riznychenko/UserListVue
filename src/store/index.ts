import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { moduleUsers, UsersState } from './modules/users';

export interface State {
  users: UsersState
}

export const key: InjectionKey<Store<State>> = Symbol('') as InjectionKey<Store<State>>;

export const store = createStore({
  modules: {
    users: moduleUsers,
  },
});

export function useStore() {
  return baseUseStore(key);
}
