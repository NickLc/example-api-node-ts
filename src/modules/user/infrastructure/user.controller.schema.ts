import { z } from 'zod'
import { user, id } from '@user/domain'

export const UserControllerSchema = {
  register: z.object({
    body: user.strict()
  }),

  remove: z.object({
    params: z.object({
      id
    })
  }),

  update: z.object({
    params: z.object({
      id
    }),
    body: user.omit({ id: true }).partial()
  })
}
