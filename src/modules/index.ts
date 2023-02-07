import { Express } from 'express'
import { userRoutes } from '@user/infrastructure'

const ROUTES = [userRoutes]

export const setRoutes = (app: Express): void => {
  ROUTES.forEach((route) => {
    app.use(route)
  })
}
