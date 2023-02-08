/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { User, UserData, UserRepository } from '@user/domain'
import users from '@db/user.json'
import * as fs from 'fs'

export class JsonUserRepository implements UserRepository {
  findAll(): User[] {
    return users
      .map((user) => new User(user as UserData, this))
      .filter((users) => !users.isDeleted())
  }

  findByIdOrThrow(id: number): User {
    const user = this.findAll().find((user) => user.getData().id === id)
    if (user == null) {
      throw new Error('User not found in the database')
    }
    return user
  }

  throwIfExistsInDB(user: UserData): void {
    const userFound = this.findAll().find(
      (u) =>
        u.getData().username === user.username || u.getData().id === user.id
    )
    if (userFound != null) {
      throw new Error('User already exists in the database')
    }
  }

  create(user: UserData): void {
    users.push(user as any)
    this.persist(users)
  }

  update(id: number, user: UserData): void {
    const index = this.getIndex(id)
    users[index] = user as any
    this.persist(users)
  }

  /**
   * *Import: This methods is not defined in Interface, is exclusive to db json
   */
  getIndex(id: number): number {
    const index = users.findIndex((u) => u.id === id && !u.deleted)
    if (index === -1) {
      throw new Error('User not found in the database')
    }
    return index
  }

  persist(users: any[]): void {
    fs.writeFileSync('src/db/user.json', JSON.stringify(users, null, 2))
  }
}

export const jsonUserRepository = new JsonUserRepository()
