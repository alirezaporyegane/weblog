const express = require('express'),
router = express.Router(),
ProductsUnit = require('../http/controller/Products-Unit'),
{ authUsre, admin } = require('../http/middleware/check-auth')

// PRODUCTS UNIT
router.get('/', [authUsre, admin], ProductsUnit.getAll)
router.get('/count', [authUsre, admin], ProductsUnit.getCount)
router.get('/:id', [authUsre, admin], ProductsUnit.getById)
router.post('/', [authUsre, admin], ProductsUnit.create)
router.put('/:id', [authUsre, admin], ProductsUnit.update)
router.delete('/:id', [authUsre, admin], ProductsUnit.remove)


module.exports = router

