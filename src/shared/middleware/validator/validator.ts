import { validationResult, ValidationChain } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Validator {
  static request = (validations: ValidationChain[]) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      await Promise.all(
        validations.map(async (validation) => await validation.run(req))
      )

      const errors = validationResult(req)
      if (errors.isEmpty()) {
        return next()
      }
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: errors.array() })
    }
  }
}
