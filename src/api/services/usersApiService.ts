import axios, { AxiosResponse } from 'axios';
import { API_LIST } from '@/api/constants';
import { IListData } from '@/models/ListData';
import { IAddUserData, IAddUserResponseData, IUserData } from '@/models/UserData';

class UsersService {
  public async readListUserApi(page?: number): Promise<IListData<IUserData>> {
    const response: AxiosResponse<IListData<IUserData>> = await axios.get(`${API_LIST.USERS}?page=${page}`);
    return response.data;
  }

  public async deleteUserApi(id: IUserData['id']): Promise<null> {
    const response: AxiosResponse<null> = await axios.delete(`${API_LIST.USERS}/${id}`);
    return response.data;
  }

  public async createUserApi(data: IAddUserData): Promise<IAddUserResponseData> {
    const response: AxiosResponse<IAddUserResponseData> = await axios.post(API_LIST.USERS, data);
    return response.data;
  }

  public async updateUserApi(data: IUserData): Promise<IUserData> {
    const response: AxiosResponse<IUserData> = await axios.put(`${API_LIST.USERS}/${data.id}`, data);
    return response.data;
  }
}

export const usersService = new UsersService();
