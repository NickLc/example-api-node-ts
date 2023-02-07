/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { User, UserData } from '@user/domain'
import users from '@db/user.json'
import * as fs from 'fs'

export class UserRepository {
  findAll(): User[] {
    return users
      .map((user) => new User(user as UserData))
      .filter((users) => !users.isDeleted())
  }

  findByIdOrThrow(id: number): User {
    const user = this.findAll().find((user) => user.getData().id === id)
    if (user == null) {
      throw new Error('User not found in the database')
    }
    return user
  }

  create(user: UserData): void {
    users.push(user as any)
    this.persist(users)
  }

  update(index: number, user: UserData): void {
    users[index] = user as any
    this.persist(users)
  }

  persist(users: any[]): void {
    fs.writeFileSync('src/db/user.json', JSON.stringify(users, null, 2))
  }
}

export const userRepository = new UserRepository()
