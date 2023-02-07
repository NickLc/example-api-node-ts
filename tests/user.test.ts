import request from 'supertest'
import app from '../src/app'
import { ERROR_RESPONSE } from './mocks/error'
import { userUseCase } from '../src/modules/user/application'
import { UserData } from '../src/modules/user/domain'
import users from '../src/db/user.json'

describe('User', () => {
  let token: string

  beforeEach(async () => {
    // jest.useFakeTimers()
    // const resLogin = await login();
    // token = resLogin.body.data;
    token = 'fakeToken'
  })

  describe('/users', () => {
    const route = '/api/v1/users'

    describe('GET - list users', () => {
      it('should success list and return 200', async () => {
        userUseCase.findAll = jest.fn().mockImplementation(() => [users])
        userUseCase.findAll()
        const res = await request(app).get(route)
        // .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
          data: [users]
        })
      })

      it('should error list and return 200', async () => {
        userUseCase.findAll = jest.fn().mockImplementation(() => {
          throw new Error(ERROR_RESPONSE.message)
        })
        const res = await request(app)
          .get(route)
          .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(500)
        expect(res.body).toEqual(ERROR_RESPONSE)
      })
    })

    describe('POST - register user', () => {
      const newUser: UserData = {
        id: 1,
        username: 'test',
        password: 'password',
        status: 'Activo',
        mount: 1000
      }

      it('should success register and return 201', async () => {
        userUseCase.register = jest.fn().mockImplementation(() => newUser)
        userUseCase.register(newUser)
        const res = await request(app)
          .post(route)
          .set('Authorization', `Bearer ${token}`)
          .send(newUser)

        expect(res.status).toBe(201)
        expect(res.body).toEqual({
          message: 'Se ha creado correctamente el registro',
          data: newUser
        })
      })

      it('should error register and return 422', async () => {
        const newUser = {
          id: 1,
          username: 'el',
          password: 'pass',
          status: 'Activado',
          mount: -124
        }
        const res = await request(app)
          .post(route)
          .set('Authorization', `Bearer ${token}`)
          .send(newUser)
        expect(res.status).toBe(422)
      })

      it('should error register and return 500', async () => {
        userUseCase.register = jest.fn().mockImplementation(() => {
          throw new Error(ERROR_RESPONSE.message)
        })
        const res = await request(app)
          .post(route)
          .set('Authorization', `Bearer ${token}`)
          .send(newUser)
        expect(res.status).toBe(500)
        expect(res.body).toEqual(ERROR_RESPONSE)
      })
    })
  })

  describe('/users/:id', () => {
    const route = '/api/v1/users/1'

    describe('DELETE - remove user', () => {
      it('should success remove and return 200', async () => {
        const user: UserData = {
          id: 1,
          username: 'admin',
          password: 'password',
          status: 'Activo',
          mount: 1000
        }
        userUseCase.delete = jest.fn().mockImplementation(() => user)
        userUseCase.delete(1)
        const res = await request(app)
          .delete(route)
          .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
          message: 'Se ha eliminado correctamente el registro',
          data: user
        })
      })

      it('should error delete and return 500', async () => {
        userUseCase.delete = jest.fn().mockImplementation(() => {
          throw new Error(ERROR_RESPONSE.message)
        })
        const res = await request(app)
          .delete(route)
          .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(500)
        expect(res.body).toEqual(ERROR_RESPONSE)
      })
    })

    describe('PUT - update user', () => {
      const user: UserData = {
        id: 1,
        username: 'admin',
        password: 'password',
        status: 'Activo',
        mount: 1000
      }

      it('should success update and return 200', async () => {
        userUseCase.update = jest.fn().mockImplementation(() => user)
        userUseCase.update(1, user)
        const res = await request(app)
          .put(route)
          .set('Authorization', `Bearer ${token}`)
          .send(user)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
          message: 'Se ha actualizado correctamente el registro',
          data: user
        })
      })

      it('should error update and return 500', async () => {
        userUseCase.update = jest.fn().mockImplementation(() => {
          throw new Error(ERROR_RESPONSE.message)
        })
        const res = await request(app)
          .put(route)
          .set('Authorization', `Bearer ${token}`)
          .send(user)
        expect(res.status).toBe(500)
        expect(res.body).toEqual(ERROR_RESPONSE)
      })
    })
  })
})
