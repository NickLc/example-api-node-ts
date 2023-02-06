/**
 * @swagger
 * components:
 *  parameters:
 *    id:
 *     in: path
 *     name: id
 *     required: true
 *     description: Id of the entity
 *     schema:
 *       type: integer
 *  schemas:
 *    Id:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *      example:
 *        id: 1
 *    User:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: Username of the user
 *        password:
 *          type: string
 *          description: Password of the user
 *        status:
 *          type: string
 *          description: Status of the vehicle (Activo, Inactivo)
 *          enum:
 *            - Activo
 *            - Inactivo
 *        mount:
 *          type: integer
 *          description: Mount of the user
 *      example:
 *        username: admin
 *        password: admin
 *        status: Activo
 *        mount: 1000
 */
