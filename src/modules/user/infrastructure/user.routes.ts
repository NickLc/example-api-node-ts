/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from 'express'
import { userController } from './user.controller'
import { userRules } from './user.rules'
import { Validator } from '../../../shared'

class UserRoute {
  public router: Router
  private readonly version = 'v1'

  constructor() {
    this.router = express.Router()
    this.routes()
  }

  setVersion(path: string): string {
    return `/api/${this.version}${path}`
  }

  public routes(): void {
    this.router.get(this.setVersion('/users'), userController.findAll)
    this.router.post(
      this.setVersion('/users'),
      Validator.request(userRules.register()),
      userController.register
    )
    this.router.put(
      this.setVersion('/users/:id'),
      Validator.request(userRules.update()),
      userController.update
    )
    this.router.delete(
      this.setVersion('/users/:id'),
      Validator.request(userRules.remove()),
      userController.remove
    )
  }
}

export const userRoutes = new UserRoute().router
