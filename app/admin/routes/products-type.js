const express = require('express'),
router = express.Router(),
ProductsTypeController = require('../http/controller/Products-Type'),
{ authUsre, admin } = require('../http/middleware/check-auth')

// products type
router.get('/', [authUsre, admin], ProductsTypeController.getAll)
router.get('/count', [authUsre, admin], ProductsTypeController.getCount)
router.get('/:id', [authUsre, admin], ProductsTypeController.getById)
router.post('/', [authUsre, admin], ProductsTypeController.create)
router.put('/:id', [authUsre, admin], ProductsTypeController.update)
router.delete('/:id', [authUsre, admin], ProductsTypeController.remove)


module.exports = router

