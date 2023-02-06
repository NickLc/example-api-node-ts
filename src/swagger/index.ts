import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST',
      version: '1.0.0',
      description: 'A simple API for a example'
    },
    servers: [
      {
        url: 'http://localhost:8080/api/v1'
      }
    ]
  },
  apis: ['./src/swagger/**/*.ts']
}
export const swaggerSpec = swaggerJSDoc(options)
