import { param, ValidationChain } from 'express-validator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RulesParam {
  static id(nameId = 'id'): ValidationChain {
    return param(nameId)
      .isInt()
      .withMessage('Debe ser un número entero')
      .custom((value) => {
        if (value <= 0) {
          throw new Error('Debe ser mayor a cero')
        }
        return true
      })
      .toInt()
  }
}
