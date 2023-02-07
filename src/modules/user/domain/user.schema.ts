import { z } from 'zod'

export const id = z
  .string({
    required_error: 'Id is required'
  })
  .or(z.number())
  .transform((val, ctx) => {
    const id = Number(val)
    if (isNaN(id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        expected: 'number',
        received: 'string'
      })
      return z.NEVER
    }
    return id
  })

export const username = z
  .string({
    required_error: 'Username is required'
  })
  .min(3, {
    message: 'Username must be at least 3 characters'
  })
  .max(20, {
    message: 'Username must be at most 20 characters'
  })

export const password = z
  .string({
    required_error: 'Password is required'
  })
  .min(6, {
    message: 'Password must be at least 6 characters'
  })
  .max(20, {
    message: 'Password must be at most 20 characters'
  })

export const status = z.enum(['Activo', 'Inactivo'], {
  required_error: 'Status is required'
})

export const mount = z
  .number({
    required_error: 'Mount is required'
  })
  .min(0, {
    message: 'Mount must be greater than 0'
  })
  .max(1000000, {
    message: 'Mount must be less than 1000000'
  })

export const user = z.object({
  id,
  username,
  password,
  status,
  mount
})
