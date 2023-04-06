/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserData } from '@user/domain'

export interface UserRepository {
  findAll(): UserData[]
  findByIdOrThrow(id: number): UserData
  throwIfExistsInDB(user: UserData): void
  create(user: UserData): void
  update(id: number, user: UserData): void
}
