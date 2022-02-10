/**
 * @swagger
 * tags:
 *    name: Brands
 *    description: The Brand Managing API
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
 *     Brand:
 *       type: object
 *       required:
 *         - title
 *         - slug
 *         - sortOrder
 *       properties:
 *         _id:
 *           type: objectId
 *           description: The auto-generated _id of the brand
 *         title:
 *           type: string
 *           description: The brand title
 *         altName:
 *           type: string
 *           description: The brand altName
 *         slug:
 *           type: string
 *           description: The brand Slug
 *         sortOrder:
 *            type: integer
 *            description: The brand sortOrder
 *         tags:
 *            type: array
 *            description: The brand tags
 *         mataTitle:
 *            type: string
 *            description: The brand metaTitle
 *         typeId:
 *            type: objectId
 *            description: The brand typeId
 *         metaDescription:
 *            type: string
 *            description: The brand metaDescription
 *         otherName:
 *            type: array
 *            description: The brand otherName
 *         body:
 *            type: string
 *            description: The brand body
 *         image:
 *            type: String
 *            description: The brand image
 *       example:
 *         _id: "objectId"
 *         title: "string"
 *         slug: "string"
 *         altName: "string"
 *         sortOrder: 0
 *         tags: [ "string" ]
 *         mataTitle: "string"
 *         typeId: "objectId"
 *         metaDescription: "string"
 *         otherName: [ "string" ]
 *         body: "string"
 *         image: "string"
 */

/**
 * @swagger
 * /api/admin/brands:
 *  get:
 *    summary: Get all instances of the model matched by filter from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Brands]
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
 *        name: title
 *        schema:
 *          type: string
 *      - in: query
 *        name: slug
 *        schema:
 *          type: string
 *      - in: query
 *        name: include
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        description: "Accepted values: typeId"
 *    description: use to request all brand
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The auto-generated _id of the brand
 *                   title:
 *                     type: string
 *                     description: The brand title
 *                   altName:
 *                     type: string
 *                     description: The brand altName
 *                   slug:
 *                     type: string
 *                     description: The brand Slug
 *                   sortOrder:
 *                      type: integer
 *                      description: The brand sortOrder
 *                   tags:
 *                      type: array
 *                      description: The brand tags
 *                   mataTitle:
 *                      type: string
 *                      description: The brand metaTitle
 *                   typeId:
 *                      type: Object
 *                      example: {
 *                        _id: "string",
 *                        title: "string",
 *                        slug: "string",
 *                        unit: "string",
 *                        active: true
 *                       }
 *                   metaDescription:
 *                      type: string
 *                      description: The brand metaDescription
 *                   otherName:
 *                      type: array
 *                      description: The brand otherName
 *                   body:
 *                      type: string
 *                      description: The brand body
 *                   image:
 *                      type: String
 *                      description: The brand image
 */

/**
 * @swagger
 * /api/admin/brands:
 *  post:
 *    summary: Create a new instance if the model and persist it into the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Brands]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Brand'
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Brand'
 */

/**
 * @swagger
 * /api/admin/brands/count:
 *  get:
 *    summary: Get all instances of the model matched by filter from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Brands]
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
 * /api/admin/brands/{id}:
 *  get:
 *    summary: Get a model instances by { id } from data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Brands]
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Brand'
 */

/**
 * @swagger
 * /api/admin/brands/{id}:
 *  put:
 *    summary: Replace attributes for a model instances persist it into the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Brands]
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
 *               $ref: '#/components/schemas/Brand'
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Brand'
 */

/**
 * @swagger
 * /api/admin/brands/{id}:
 *  delete:
 *    summary: Delete a model instance by { id } from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [Brands]
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
