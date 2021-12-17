/**
 * @swagger
 * tags:
 *    name: ProductsType
 *    description: The ProductsType Managing API
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
 *  schemas:
 *    colorSchema:
 *      type: object
 *      required:
 *          - title
 *          - color
 *          - sortOrder
 *      properties:
 *          _id:
 *            type: string
 *          title:
 *            type: string
 *            maxLength: 150
 *          altTitle:
 *            type: string
 *            maxLength: 150
 *            nullable: true
 *          color:
 *            type: string
 *          image:
 *            type: string
 *            nullable: true
 *          sortOrder:
 *            type: integer
 *          active:
 *            type: boolean
 *            example: true
 *
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    sizeSchema:
 *      type: object
 *      required:
 *          - title
 *          - sortOrder
 *      properties:
 *          _id:
 *            type: string
 *          title:
 *            type: string
 *          altTitle:
 *            type: string
 *          image:
 *            type: string
 *          sortOrder:
 *            type: integer
 *          active:
 *            type: boolean
 *            example: true
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    guaranteeSchema:
 *      type: object
 *      required:
 *          - title
 *          - sortOrder
 *      properties:
 *          _id:
 *            type: string
 *          title:
 *            type: string
 *          altTitle:
 *            type: string
 *          image:
 *            type: string
 *          sortOrder:
 *            type: integer
 *          active:
 *            type: boolean
 *            example: true
 */


/**
 * @swagger
 * components:
 *  schemas:
 *    fieldTypeGroupsSchema:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        fieldTypes:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/fieldTypesSchema'
 */



/**
 * @swagger
 * components:
 *  schemas:
 *    fieldTypesSchema:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        displayName:
 *          type: string
 *        type:
 *          type: integer
 *        viewData:
 *          type: string
 *        required:
 *           type: boolean
 *        filterable:
 *           type: boolean
 *        featured:
 *           type: boolean
 *        fieldTypeOn:
 *           type: integer
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     ProductsType:
 *       type: object
 *       required:
 *         - title
 *         - sortOrder
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           maxLength: 140
 *         r1:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         r2:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         r3:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         r4:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         r5:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         r6:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         tab1:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         tab2:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         tab3:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         tab4:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         tab5:
 *          type: string
 *          maxLength: 50
 *          nullable: true
 *         tab6:
 *          type: string
 *          nullable: true
 *         slug:
 *          type: string
 *          nullable: true
 *         sortOrder:
 *          type: integer
 *         typeId:
 *          type: string
 *          nullable: true
 *         active:
 *          type: string
 *         unit:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *            _id:
 *              type: string
 *            name:
 *              type: string
 *            sortOrder:
 *              type: integer
 *            precision:
 *              type: integer
 *            active:
 *              type: boolean
 *         color:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/colorSchema'
 *          nullable: true
 *         size:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/sizeSchema'
 *          nullable: true
 *         guarantee:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/guaranteeSchema'
 *          nullable: true
 *         fieldTypeGroups:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/fieldTypeGroupsSchema'
 *          nullable: true
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    infoSchema:
 *      type: object
 *      required:
 *          - title
 *          - sortOrder
 *      properties:
 *          text:
 *            type: string
 *          value:
 *            type: string
 */


/**
 * @swagger
 * /api/admin/product-set-type:
 *  get:
 *    summary: Get all instances of the model matched by filter from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [ProductsType]
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
 *        name: include
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        description: "Accepted values: typeId, unit, color, size, guarantee, fieldTypeGroups, tab1, tab2, tab3, tab4, tab5, tab6, r1, ,r2, r3, r4, ,r5, r6"
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ProductsType'
 *
 */

/**
 * @swagger
 * /api/admin/product-set-type:
 *  post:
 *    summary: Create a new instance if the model and persist it into the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [ProductsType]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductsType'
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ProductsType'
 */



/**
 * @swagger
 * /api/admin/product-set-type/info:
 *  get:
 *    summary: Get all instances of the model matched by filter from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [ProductsType]
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
 *        name: include
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        description: "Accepted values: typeId, unit, color, size, guarantee, fieldTypeGroups, tab1, tab2, tab3, tab4, tab5, tab6, r1, ,r2, r3, r4, ,r5, r6"
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
 * /api/admin/product-set-type/count:
 *  get:
 *    summary: Get all instances of the model matched by filter from the data source
 *    security:
 *      - ApiKeyAuth: [admin]
 *    tags: [ProductsType]
 *    parameters:
 *      - in: query
 *        name: title
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
