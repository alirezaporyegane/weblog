const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../http/middleware/check-auth'),
ProductsController = require('../http/controller/Products');

router.get('/', [authUsre, admin], ProductsController.getAll)
router.get('/count', [authUsre, admin], ProductsController.getCount)
router.get('/:id', [authUsre, admin], ProductsController.getById)
router.post('/', [authUsre, admin], ProductsController.create)
router.put('/:id', [authUsre, admin], ProductsController.update)
router.delete('/:id', [authUsre, admin], ProductsController.remove)

module.exports = router