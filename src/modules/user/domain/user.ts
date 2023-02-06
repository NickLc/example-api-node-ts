import { UserData, UserUpdateInput } from './user.types'
import { userRepository } from './user.repository'
import users from '../../../db/user.json'

export class User {
  private data: UserData

  constructor(data: UserData) {
    this.data = data
  }

  getData(): UserData {
    return this.data
  }

  getId(): number {
    return this.data.id
  }

  getIndex(): number {
    const index = users.findIndex((u) => u.id === this.getId())
    if (index === -1) {
      throw new Error('User not found in the database')
    }
    return index
  }

  isDeleted(): boolean {
    return this.data?.deleted ?? false
  }

  throwIfExistsInDB(): void {
    const user = userRepository
      .findAll()
      .find(
        (user) =>
          user.getData().username === this.data.username ||
          user.getData().id === this.data.id
      )
    if (user != null) {
      throw new Error('User already exists in the database')
    }
  }

  create(): User {
    this.throwIfExistsInDB()
    userRepository.create(this.getData())
    return this
  }

  update(input: UserUpdateInput): User {
    this.data = { ...this.data, ...input }
    userRepository.update(this.getIndex(), this.getData())
    return this
  }

  delete(): User {
    this.data.deleted = true
    userRepository.update(this.getIndex(), this.getData())
    return this
  }
}
