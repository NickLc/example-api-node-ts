import { UserUseCase } from '@user/application'
import { UserData, UserUpdateInput } from '@user/domain'
import { correctUsers } from './mocks'

describe('user-usecase', () => {
  // Tests that findall() returns an array of userdata objects.
  it('test_find_all', () => {
    const mockUserRepository = {
      findAll: jest.fn(() => correctUsers)
    }
    const userUseCase = new UserUseCase(mockUserRepository as any)
    const result = userUseCase.findAll()
    expect(result).toEqual(correctUsers)
    expect(mockUserRepository.findAll).toHaveBeenCalled()
  })
  // Tests that register(input) throws an error if user already exists.
  it('test_register_existing_user', () => {
    const mockUserRepository = {
      throwIfExistsInDB: jest.fn(() => {
        throw new Error('User already exists')
      })
    }
    const userUseCase = new UserUseCase(mockUserRepository as any)
    const input: UserData = {
      id: 1,
      username: 'user1',
      password: 'password1',
      status: 'Activo',
      mount: 100
    }
    expect(() => userUseCase.register(input)).toThrow('User already exists')
    expect(mockUserRepository.throwIfExistsInDB).toHaveBeenCalledWith(input)
  })

  // Tests that delete(id) throws an error if user not found.
  it('test_delete_non_existing_user', () => {
    const mockUserRepository = {
      findByIdOrThrow: jest.fn(() => {
        throw new Error('User not found')
      })
    }
    const userUseCase = new UserUseCase(mockUserRepository as any)
    const id = 1
    expect(() => userUseCase.delete(id)).toThrow('User not found')
    expect(mockUserRepository.findByIdOrThrow).toHaveBeenCalledWith(id)
  })
  it('test_delete_existing_user', () => {
    const input: UserData = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      status: 'Activo',
      mount: 100
    }
    const mockUserRepository = {
      findByIdOrThrow: jest.fn().mockReturnValue(input),
      update: jest.fn()
    }
    const userUseCase = new UserUseCase(mockUserRepository as any)
    const id = 1
    const expectedOutput: UserData = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      status: 'Activo',
      mount: 100,
      deleted: true
    }
    const result = userUseCase.delete(id)
    expect(result).toEqual(expectedOutput)

    expect(mockUserRepository.findByIdOrThrow).toHaveBeenCalledWith(1)
    expect(mockUserRepository.update).toHaveBeenCalledWith(1, expectedOutput)
  })
  // Tests that register(input) creates a new user and returns its userdata object.
  it('test_register_new_user', () => {
    const mockUserRepository = {
      findAll: jest.fn().mockReturnValue([]),
      throwIfExistsInDB: jest.fn(),
      create: jest.fn(),
      findByIdOrThrow: jest.fn(),
      update: jest.fn()
    }
    const userUseCase = new UserUseCase(mockUserRepository)
    const input: UserData = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      status: 'Activo',
      mount: 100
    }
    const expectedOutput: UserData = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      status: 'Activo',
      mount: 100
    }
    const result = userUseCase.register(input)
    expect(result).toEqual(expectedOutput)
    expect(mockUserRepository.create).toHaveBeenCalledWith(input)
  })

  // Tests that update(id, input) updates an existing user and returns its userdata object.
  it('test_update_existing_user', () => {
    const input: UserData = {
      id: 1,
      username: 'testuser',
      password: 'testpassword',
      status: 'Activo',
      mount: 100
    }
    const mockUserRepository = {
      findAll: jest.fn().mockReturnValue([]),
      throwIfExistsInDB: jest.fn(),
      create: jest.fn(),
      findByIdOrThrow: jest.fn().mockReturnValue(input),
      update: jest.fn()
    }
    const userUseCase = new UserUseCase(mockUserRepository)
    const updateInput: UserUpdateInput = {
      password: 'newpassword',
      status: 'Inactivo',
      mount: 200
    }
    const expectedOutput: UserData = {
      id: 1,
      username: 'testuser',
      password: 'newpassword',
      status: 'Inactivo',
      mount: 200
    }
    const result = userUseCase.update(1, updateInput)
    expect(result).toEqual(expectedOutput)
    expect(mockUserRepository.findByIdOrThrow).toHaveBeenCalledWith(1)
    expect(mockUserRepository.update).toHaveBeenCalledWith(1, expectedOutput)
  })

  // Tests that update(id, input) throws an error if user not found.
  it('test_update_non_existing_user', () => {
    const mockUserRepository = {
      findAll: jest.fn().mockReturnValue([]),
      throwIfExistsInDB: jest.fn(),
      create: jest.fn(),
      findByIdOrThrow: jest.fn().mockImplementation(() => {
        throw new Error('User not found')
      }),
      update: jest.fn()
    }
    const userUseCase = new UserUseCase(mockUserRepository)
    const input: UserUpdateInput = {
      password: 'newpassword',
      status: 'Inactivo',
      mount: 200
    }
    expect(() => userUseCase.update(1, input)).toThrow('User not found')
    expect(mockUserRepository.findByIdOrThrow).toHaveBeenCalledWith(1)
    expect(mockUserRepository.update).not.toHaveBeenCalled()
  })
})
