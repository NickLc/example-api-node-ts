/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { User, UserData } from '@user/domain'

export interface UserRepository {
  findAll(): User[]
  findByIdOrThrow(id: number): User
  throwIfExistsInDB(user: UserData): void
  create(user: UserData): void
  update(id: number, user: UserData): void
}
