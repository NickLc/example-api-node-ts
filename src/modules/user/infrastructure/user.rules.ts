import { ValidationChain } from 'express-validator'
import { RulesBody, RulesParam } from '@shared/middleware'

export class UserRules {
  register(): ValidationChain[] {
    return [
      RulesBody.isNumeric({ name: 'id', isRequired: true }),
      RulesBody.isString({ name: 'username', isRequired: true }),
      RulesBody.isString({ name: 'password', isRequired: true }),
      RulesBody.isIn({
        name: 'status',
        isRequired: true,
        values: ['Activo', 'Inactivo']
      }),
      RulesBody.isNumeric({ name: 'mount', isRequired: true })
    ]
  }

  remove(): ValidationChain[] {
    return [RulesParam.id()]
  }

  update(): ValidationChain[] {
    return [
      RulesParam.id(),
      RulesBody.isString({ name: 'username' }),
      RulesBody.isString({ name: 'password' }),
      RulesBody.isIn({
        name: 'status',
        values: ['Activo', 'Inactivo']
      }),
      RulesBody.isNumeric({ name: 'mount' })
    ]
  }
}

export const userRules = new UserRules()
