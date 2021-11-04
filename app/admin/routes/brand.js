const express = require('express'),
router = express.Router(),
brandController = require('../http/controller/Brand'),
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

router.get('/', [authUsre, admin], brandController.getAll)


router.get('/count', [authUsre, admin], brandController.getCount)
router.get('/:id', [authUsre, admin], brandController.getById)
router.post('/', [authUsre, admin], brandController.create)
router.put('/:id', [authUsre, admin], brandController.update)
router.delete('/:brandId', [authUsre, admin], brandController.delete)

module.exports = router