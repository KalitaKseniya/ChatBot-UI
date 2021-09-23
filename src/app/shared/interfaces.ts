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
  userName: string,
  roles: string[]
}

export interface Role{
  id: string,
  name: string
}

export interface PasswordChangeDto{
  oldPassword: string,
  newPassword: string
}

export interface RoleForCreationDto{
  name: string,
  permissions: Permission[]
}

export interface PermissionForRole{
  name: string
}

export interface Permission{
  id: number,
  name: string,
  description: string
}

export interface UserForAuthenticationDto{
  username: string
  password: string
}

export interface ServerAuthResponse{
  minutesExpires: number,
  roles: any,
  token: string
}
