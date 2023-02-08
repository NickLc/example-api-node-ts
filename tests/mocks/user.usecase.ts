import { ERROR_RESPONSE } from './error'

export const fnError = jest.fn().mockImplementation(() => {
  throw new Error(ERROR_RESPONSE.message)
})
