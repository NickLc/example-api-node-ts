import { UserData } from '@user/domain'
import { ERROR_RESPONSE } from './error'

export const fnError = jest.fn().mockImplementation(() => {
  throw new Error(ERROR_RESPONSE.message)
})

export const correctUsers: UserData[] = [
  {
    id: 1,
    username: 'John',
    password: 'test',
    status: 'Activo',
    mount: 199
  },
  {
    id: 3,
    username: 'John2',
    password: 'test2',
    status: 'Inactivo',
    mount: 120
  }
]
