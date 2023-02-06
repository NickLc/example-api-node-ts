/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *       description: A list of users
 *       content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *           message:
 *             $ref: '#/components/responses/SuccessList'
 *           data:
 *             type: array
 *             items:
 *              allOf:
 *                - $ref: '#/components/schemas/Id'
 *                - $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorAuthBadRequest'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorUnauthorized'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorAuthForbidden'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorInternal'
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          allOf:
 *            - $ref: '#/components/schemas/Id'
 *            - $ref: '#/components/schemas/User'
 *
 *     responses:
 *      201:
 *        description: User created
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/SuccessRegister'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorAuthBadRequest'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorUnauthorized'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorAuthForbidden'
 *      422:
 *        description: Validation error
 *        content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/responses/ErrorValidation'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorInternal'
 *
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     description: Update a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/User'
 *     responses:
 *      200:
 *       description: User updated
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/responses/SuccessUpdate'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorAuthBadRequest'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorUnauthorized'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorAuthForbidden'
 *      422:
 *        description: Validation error
 *        content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/responses/ErrorValidation'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorInternal'
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     description: Delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *      200:
 *       description: User deleted
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/responses/SuccessDelete'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorAuthBadRequest'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorUnauthorized'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorAuthForbidden'
 *      422:
 *        description: Validation error
 *        content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/responses/ErrorValidation'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/responses/ErrorInternal'
 */
