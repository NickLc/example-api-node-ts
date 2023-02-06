import { body, ValidationChain } from 'express-validator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class RulesBody {
  static isRequired(
    requiered: boolean,
    rule: ValidationChain
  ): ValidationChain {
    if (requiered) {
      return rule.exists().withMessage('Es requerido')
    }
    return rule.optional()
  }

  static setBaseRule(params: IRuleBodyBase): ValidationChain {
    const { name, isRequired = false } = params
    return this.isRequired(isRequired, body(name))
  }

  static isString(param: IRuleBodyString): ValidationChain {
    const { min = 3, max = 50, ...baseParams } = param
    return RulesBody.setBaseRule(baseParams)
      .isString()
      .withMessage('Debe ser un string')
      .isLength({ min, max })
      .withMessage(`Debe tener entre ${min} y ${max} caracteres`)
      .trim()
  }

  static isObject(param: IRuleBodyBase): ValidationChain {
    return RulesBody.setBaseRule(param)
      .isObject()
      .withMessage('Debe ser un objeto')
  }

  static isNumeric(param: IRuleBodyBase): ValidationChain {
    return RulesBody.setBaseRule(param)
      .isNumeric()
      .withMessage('Debe ser un valor numerico')
      .trim()
      .toFloat()
  }

  static isDate(param: IRuleBodyBase): ValidationChain {
    return RulesBody.setBaseRule(param)
      .isDate({ format: 'YYYY-MM-DD', delimiters: ['-'] })
      .withMessage('Debe ser un valor de tipo fecha')
      .trim()
  }

  static isEmail(parm: IRuleBodyString): ValidationChain {
    return RulesBody.setBaseRule(parm)
      .isEmail()
      .withMessage('Debe ser un email')
      .trim()
  }

  static isBoolean(parm: IRuleBodyBase): ValidationChain {
    return RulesBody.setBaseRule(parm)
      .isBoolean()
      .withMessage('Debe ser un valor true(1) / false(0). ')
      .trim()
  }

  static isIn(param: IRuleBodyIsIn): ValidationChain {
    const { values, ...baseParams } = param
    return RulesBody.setBaseRule(baseParams)
      .isIn(values)
      .withMessage(
        `Debe ser uno de los siguientes valores: ${values.join(', ')}`
      )
  }

  static isModel(param: IRuleBodyBase): ValidationChain {
    return RulesBody.setBaseRule(param)
      .isInt()
      .withMessage('Debe ser un número entero')
      .custom((id) => {
        if (id <= 1900) {
          throw new Error('Debe ser mayor a 1900')
        }
        return true
      })
      .toInt()
  }
}
interface IRuleBodyBase {
  name: string
  isRequired?: boolean
}
interface IRuleBodyString extends IRuleBodyBase {
  min?: number
  max?: number
}
interface IRuleBodyIsIn extends IRuleBodyBase {
  values: readonly string[]
}
