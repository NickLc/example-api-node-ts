/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userUseCase } from '../application'

export class UserController {
  findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = userUseCase.findAll()
      return res.status(StatusCodes.OK).send({ data: users })
    } catch (err) {
      return next(err)
    }
  }

  register(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body
      const user = userUseCase.register(input)
      return res.status(StatusCodes.CREATED).send({
        message: 'Se ha creado correctamente el registro',
        data: user
      })
    } catch (err) {
      return next(err)
    }
  }

  update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const input = req.body
      const user = userUseCase.update(Number(id), input)
      return res.status(StatusCodes.OK).send({
        message: 'Se ha actualizado correctamente el registro',
        data: user
      })
    } catch (err) {
      return next(err)
    }
  }

  remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
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
