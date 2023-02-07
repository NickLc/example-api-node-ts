/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextFunction } from 'express'

export const errorHandler = (
  err: any,
  req: Request,
  res: any,
  next: NextFunction
): void => {
  const status = parseInt(err.status) || 500
  const message = err.message || 'Error Internal'
  res.status(status).send({ message, cause: err?.cause })
}
