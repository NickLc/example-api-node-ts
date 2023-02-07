/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from 'express'
// Set controller allways using ./controller not use @user/infraestructure
import { userController } from './user.controller'

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
    this.router.post(this.setVersion('/users'), userController.register)
    this.router.put(this.setVersion('/users/:id'), userController.update)
    this.router.delete(this.setVersion('/users/:id'), userController.remove)
  }
}

export const userRoutes = new UserRoute().router
