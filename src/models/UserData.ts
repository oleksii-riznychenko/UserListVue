export interface IUserData {
  readonly id: number
  readonly email: string
  readonly avatar: string
  readonly last_name: string
  readonly first_name: string
  phone?: string
  address?: string
}

export interface IAddUserData {
  email: string
  last_name: string
  first_name: string
}

export interface IAddUserResponseData {
  readonly id: string
  readonly email: string
  readonly createdAt: string
  readonly last_name: string
  readonly first_name: string
  phone?: string
  address?: string
}
