import { IUserData } from '@/models/UserData';

export interface IUserDetailsForm {
  phone: string
  address: string
}

export interface IUserDetailsProps {
  userData: IUserData
}
