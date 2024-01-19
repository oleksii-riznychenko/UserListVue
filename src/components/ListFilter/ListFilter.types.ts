import { IUserData } from '@/models/UserData';

export interface IListFilterForm {
  email: IUserData['email']
  last_name: IUserData['last_name']
  first_name: IUserData['first_name']
}
