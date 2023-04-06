import { UserData, User, UserUpdateInput, UserRepository } from '@user/domain'

export class UserUseCase {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  findAll(): UserData[] {
    return this.userRepository.findAll()
  }

  register(input: UserData): UserData {
    const user = new User(input, this.userRepository)
    return user.create().getData()
  }

  update(id: number, input: UserUpdateInput): UserData {
    const userData = this.userRepository.findByIdOrThrow(id)
    const user = new User(userData, this.userRepository)
    return user.update(input).getData()
  }

  delete(id: number): UserData {
    const userData = this.userRepository.findByIdOrThrow(id)
    const user = new User(userData, this.userRepository)
    return user.softDelete().getData()
  }
}
