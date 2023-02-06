export interface UserData {
  id: number
  username: string
  password: string
  status: StatusType
  mount: number
  deleted?: boolean
}

export interface UserUpdateInput {
  username?: string
  password?: string
  status?: StatusType
  mount?: number
}

export const STATUS = ['Activo', 'Inactivo'] as const
export type StatusType = (typeof STATUS)[number]
