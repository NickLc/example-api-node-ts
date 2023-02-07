/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { StatusCodes } from 'http-status-codes'
import type { Request } from 'express'
import { AnyZodObject, ZodError, z } from 'zod'

class UnprocessableEntityError extends Error {
  status: number
  cause: ZodError
  constructor(cause: ZodError) {
    super('Input is not valid')
    this.cause = cause
    this.status = StatusCodes.UNPROCESSABLE_ENTITY
    return this
  }
}

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(req)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new UnprocessableEntityError(error)
    }
    throw error
  }
}
