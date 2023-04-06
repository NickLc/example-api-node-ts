/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { UserController, userUseCase } from '@user/infrastructure'
import { StatusCodes } from 'http-status-codes'

describe('User', () => {
  // Tests that findall method returns all users.
  it('test_find_all', () => {
    const req = {} as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response as any
    const next = jest.fn()
    const users = [
      {
        id: 1,
        username: 'John',
        password: 'test',
        status: 'Activo',
        mount: 199
      },
      {
        id: 2,
        username: 'John2',
        password: 'test2',
        status: 'Inactivo'
      }
    ]
    jest.spyOn(userUseCase, 'findAll').mockReturnValue(users as any[])

    const controller = new UserController()
    controller.findAll(req as any, res, next)

    expect(userUseCase.findAll).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.send).toHaveBeenCalledWith({ data: users })
    expect(next).not.toHaveBeenCalled()
  })
})
