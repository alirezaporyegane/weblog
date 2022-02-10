/**
 * @swagger
 * components:
 *   schemas:
 *     Banks:
 *       type: object
 *       required:
 *         - name
 *         - code
 *         - sortOrder
 *       properties:
 *         _id:
 *           type: objectId
 *           description: The auto-generated _id of the bank
 *         name:
 *           type: string
 *           description: The bank name
 *         code:
 *           type: string
 *           description: The bank code
 *         logo:
 *            type: string
 *            description: The bank logo
 *         active:
 *            type: boolean
 *            description: The brand active
 *       example:
 *         _id: "objectId"
 *         name: "string"
 *         code: "string"
 *         altName: "string"
 *         logo: "string"
 *         active: true
 */

/**
 * @swagger
 * tags:
 *    name: Banks
 *    description: The Bank Managing API
 *    security:
 *      - BasicAuth: []
 */

/** @swagger
 * /api/admin/banks:
 *  get:
 *    summary: Get all instances of the model matched by filter from the data source
 *    tags: [Banks]
 *    parameters:
 *      - in: path
 *        name: skip
 *        schema:
 *          type: integer
 *      - in: path
 *        name: limit
 *        schema:
 *          type: integer
 *      - in: path
 *        name: sort
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successfull response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Banks'
 *      '404':
 *        description: the banks not found
 */
