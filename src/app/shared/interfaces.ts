export interface User{
  id: string,
  userName: string,
  email: string
}

export interface UserForCreationDto{
  email: string,
  password: string,
  userName: string,
  roles: string[]
}

export interface UserForUpdateDto{
  email: string,
  userName: string
}