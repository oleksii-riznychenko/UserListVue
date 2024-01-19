import { Module } from 'vuex';
import { IListData } from '@/models/ListData';
import { IAddUserData, IUserData } from '@/models/UserData';
import { usersService } from '@/api/services/usersApiService';

export type UserListType = IListData<IUserData>

export interface UsersState {
  userList: {
    [key: string]: UserListType;
  } | null;
  currentPage: IListData<IUserData>['page'];
}

export const moduleUsers: Module<UsersState, UsersState> = {
  namespaced: true,
  actions: {
    getUsersByPage: async (context, page: IListData<IUserData>['page']) => {
      try {
        const response: IListData<IUserData> = await usersService.readListUserApi(page);

        context.commit('updateListUsers', { page, response });
        context.commit('updateCurrentPage', page);
      } catch (e) {
        console.error('Error fetching users:', e);
      }
    },
    removeUser: async (context, id: IUserData['id']) => {
      try {
        await usersService.deleteUserApi(id);

        const { currentPage } = context.state;
        const userList = context.state.userList
          ? context.state.userList[String(currentPage)].data.filter((user) => user.id !== id)
          : null;

        if (userList !== null) {
          const response = {
            ...context.state.userList?.[String(currentPage)],
            data: userList,
          };

          context.commit('updateListUsers', { page: currentPage, response });
        }
      } catch (e) {
        console.error('Error removing user:', e);
      }
    },
    addUser: async (context, data: IAddUserData) => {
      try {
        const { currentPage } = context.state;
        const userList = context.state.userList?.[String(currentPage)] as UserListType;
        const response = await usersService.createUserApi(data).then((res) => ({
          ...userList,
          data: [
            ...userList.data,
            { ...res, avatar: '', id: +res.id },
          ],
        }));

        context.commit('updateListUsers', { page: currentPage, response });
      } catch (e) {
        console.error('Error adding user:', e);
      }
    },
    updateUser: async (context, data: IUserData) => {
      try {
        const { currentPage } = context.state;
        const userList = context.state.userList?.[String(currentPage)] as UserListType;
        const response = await usersService.updateUserApi(data).then((res) => ({
          ...userList,
          data: userList.data.map((user) => (user.id === res.id ? res : user)),
        }));

        context.commit('updateListUsers', { page: currentPage, response });
      } catch (e) {
        console.error('Error updating user:', e);
      }
    },
  },
  mutations: {
    updateListUsers: (state: UsersState, { page, response }: {page: IListData<IUserData>['page'], response: UserListType}): void => {
      state.userList = {
        ...state.userList,
        [String(page)]: response,
      };
    },
    updateCurrentPage: (state: UsersState, page: IListData<IUserData>['page']): void => {
      state.currentPage = page;
    },
  },
  state: {
    userList: null,
    currentPage: 1,
  },
  getters: {
    allUsersByPage: (state: UsersState, page: IListData<IUserData>['page']): UserListType | null => {
      if (!state.userList) {
        return null;
      }

      return state.userList[String(page)];
    },
    currentPage: (state: UsersState): IListData<IUserData>['page'] => state.currentPage,
  },
};
