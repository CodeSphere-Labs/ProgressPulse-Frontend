import { Role } from '@/shared/api/auth/auth'

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  id: number
  first_name: string
  last_name: string
  patronymic: string
  email: string
  role: Role
  accessToken: string
}
