const { Router } = require('express'),
router = Router(),
{ getAll, getById, getCount, create, update, remove } = require('../http/controller/Brand'),
{ authUsre, admin } = require('../http/middleware/check-auth')

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

router.get('/', getAll)
router.get('/count', getCount)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:brandId', remove)

module.exports = router