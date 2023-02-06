/**
 * @swagger
 * components:
 *  responses:
 *    ErrorUnauthorized:
 *      description: Access token is missing or invalid
 *      type: object
 *      properties:
 *       message:
 *        type: string
 *        example: Token invalido, vuelva a iniciar sesion
 *    ErrorAuthForbidden:
 *      description: User is not allowed to access this resource
 *      type: object
 *      properties:
 *       message:
 *        type: string
 *        example: No tiene autorización para realizar esta acción
 *    ErrorAuthBadRequest:
 *      description: Is required a token to access this resource
 *      type: object
 *      properties:
 *       message:
 *        type: string
 *        example: Se necesita un token de autenticación
 *    ErrorValidation:
 *      description: Validation error, missing or invalid parameters
 *      type: object
 *      properties:
 *       error:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            msg:
 *             type: string
 *             description: Error message
 *            param:
 *             type: string
 *             description: Parameter name
 *            location:
 *             type: string
 *             description: Parameter location
 *          example:
 *            msg: Is required
 *            param: username
 *            location: body
 *    ErrorInternal:
 *      description: Internal error
 *      type: object
 *      properties:
 *        message:
 *         type: string
 *         example: Error interno al procesar la solicitud
 */
