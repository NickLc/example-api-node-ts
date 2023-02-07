/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import * as dotenv from 'dotenv'
import app from './app'
require('module-alias/register')

dotenv.config()
const PORT: number = parseInt(process.env.PORT as string, 10)

export class Server {
  async start(): Promise<void> {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`)
    })
  }
}

const server = new Server()
server.start()
