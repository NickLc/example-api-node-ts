import { UserData, User, UserUpdateInput, UserRepository } from '@user/domain'

export class UserUseCase {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  findAll(): UserData[] {
    return this.userRepository.findAll().map((user) => user.getData())
  }

  register(input: UserData): UserData {
    const user = new User(input, this.userRepository)
    return user.create().getData()
  }

  update(id: number, input: UserUpdateInput): UserData {
    const user = this.userRepository.findByIdOrThrow(id)
    return user.update(input).getData()
  }

  delete(id: number): UserData {
    const user = this.userRepository.findByIdOrThrow(id)
    return user.softDelete().getData()
  }
}
