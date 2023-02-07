/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { zParse } from '../../../shared/middleware/validator/validator-zod'
import { userUseCase } from '../application'
import { UserControllerSchema } from './user.controller.schema'

export class UserController {
  findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = userUseCase.findAll()
      return res.status(StatusCodes.OK).send({ data: users })
    } catch (err) {
      return next(err)
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { body: _input } = await zParse(UserControllerSchema.register, req)
      const user = userUseCase.register(_input)
      return res.status(StatusCodes.CREATED).send({
        message: 'Se ha creado correctamente el registro',
        data: user
      })
    } catch (err) {
      return next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
        body: input
      } = await zParse(UserControllerSchema.update, req)
      const user = userUseCase.update(id, input)
      return res.status(StatusCodes.OK).send({
        message: 'Se ha actualizado correctamente el registro',
        data: user
      })
    } catch (err) {
      return next(err)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id }
      } = await zParse(UserControllerSchema.remove, req)
      const user = userUseCase.delete(Number(id))
      return res.status(StatusCodes.OK).send({
        message: 'Se ha eliminado correctamente el registro',
        data: user
      })
    } catch (err) {
      return next(err)
    }
  }
}

export const userController = new UserController()
