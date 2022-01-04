const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../../http/middleware/check-auth'),
{ getAll, getCount, getById, create, update, remove } = require('../../http/controller/Products/Products'),
{ hasModule } = require('../../http/middleware/modules');


router.get('/', [authUsre, admin, hasModule(['products', 'products_sale'])], getAll)
router.get('/count', [authUsre, admin, hasModule(['products', 'products_sale'])], getCount)
router.get('/:id', [authUsre, admin, hasModule(['products', 'products_sale'])], getById)
router.post('/', [authUsre, admin, hasModule(['products', 'products_sale'])], create)
router.put('/:id', [authUsre, admin, hasModule(['products', 'products_sale'])], update)
router.delete('/:id', [authUsre, admin, hasModule(['products', 'products_sale'])], remove)

module.exports = router