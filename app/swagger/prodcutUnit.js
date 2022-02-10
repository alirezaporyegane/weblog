/**
 * @swagger
 * tags:
 *    name: Units
 *    description: The Units Managing API
 */

/**
 * @swagger
 *     components:
 *        securitySchemes:
 *          ApiKeyAuth:
 *            type: apiKey
 *            in: header
 *            example: "abcABC123"
 *            name: x-auth-token
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     units:
 *       type: object
 *       required:
 *         - name
 *         - sortOrder
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         sortOrder:
 *            type: integer
 *         precision:
 *            type: integer
 *         active:
 *            type: boolean
 *       example:
 *         _id: "string"
 *         name: "string"
 *         sortOrder: 0
 *         precision: 0
 *         active: true
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    infoSchema:
 *      type: object
 *      required:
 *          - name
 *      properties:
 *          text:
 *            type: string
 *          value:
 *            type: string
 */

/**
 * @swagger
 * /api/admin/product-unit:
 *  get:
 *    summary: Get all instances of the model matched by filter from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Units]
 *    parameters:
 *      - in: query
 *        name: skip
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *    description: use to request all units
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/units'
 */

/**
 * @swagger
 * /api/admin/product-unit:
 *  post:
 *    summary: Create a new instance if the model and persist it into the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Units]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/units'
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/units'
 */

/**
 * @swagger
 * /api/admin/product-unit/info:
 *  get:
 *    summary: Get all instances of the model matched by filter from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Units]
 *    parameters:
 *      - in: query
 *        name: skip
 *        schema:
 *          type: integer
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/infoSchema'
 */

/**
 * @swagger
 * /api/admin/product-unit/count:
 *  get:
 *    summary: Get all instances of the model matched by filter from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Units]
 *    parameters:
 *      - in: query
 *        name: title
 *        schema:
 *          type: string
 *      - in: query
 *        name: slug
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: integer
 *              format: int64
 *            example: 0
 */

/**
 * @swagger
 * /api/admin/product-unit/{id}:
 *  get:
 *    summary: Get a model instances by { id } from data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Units]
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: objectId
 *        required: true
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/units'
 */

/**
 * @swagger
 * /api/admin/product-unit/{id}:
 *  put:
 *    summary: Replace attributes for a model instances persist it into the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Units]
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *
 *    requesetBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/units'
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/units'
 */

/**
 * @swagger
 * /api/admin/product-unit/{id}:
 *  delete:
 *    summary: Delete a model instance by { id } from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Units]
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      204:
 *        description: success
 */
