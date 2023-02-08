import { UserData, UserUpdateInput, UserRepository } from '@user/domain'

export class User {
  private data: UserData
  private readonly userRepository: UserRepository

  constructor(data: UserData, userRepository: UserRepository) {
    this.data = data
    this.userRepository = userRepository
  }

  getData(): UserData {
    return this.data
  }

  getId(): number {
    return this.data.id
  }

  isDeleted(): boolean {
    return this.data?.deleted ?? false
  }

  create(): User {
    this.userRepository.throwIfExistsInDB(this.getData())
    this.userRepository.create(this.getData())
    return this
  }

  update(input: UserUpdateInput): User {
    this.data = { ...this.data, ...input }
    this.userRepository.update(this.getId(), this.getData())
    return this
  }

  softDelete(): User {
    this.data.deleted = true
    this.userRepository.update(this.getId(), this.getData())
    return this
  }
}
