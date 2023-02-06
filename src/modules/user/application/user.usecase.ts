import { userRepository, UserData, User, UserUpdateInput } from '../domain'

export class UserUseCase {
  findAll(): UserData[] {
    return userRepository.findAll().map((user) => user.getData())
  }

  register(input: UserData): UserData {
    const user = new User(input)
    return user.create().getData()
  }

  update(id: number, input: UserUpdateInput): UserData {
    const user = userRepository.findByIdOrThrow(id)
    return user.update(input).getData()
  }

  delete(id: number): UserData {
    const user = userRepository.findByIdOrThrow(id)
    return user.delete().getData()
  }
}

export const userUseCase = new UserUseCase()
