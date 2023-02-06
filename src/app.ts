/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUI from 'swagger-ui-express'
import { setRoutes } from './modules'
import { swaggerSpec } from './swagger'
import { errorHandler } from './shared'

dotenv.config()
const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
setRoutes(app)
app.use(errorHandler as any)
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
export default app
