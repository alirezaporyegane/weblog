const { Router } = require('express'),
router = Router(),
{ getAll, getCount, getById, create, update, remove } = require('../http/controller/Products-Unit'),
{ authUsre, admin } = require('../http/middleware/check-auth')

// PRODUCTS UNIT
router.get('/', [authUsre, admin], getAll)
router.get('/count', [authUsre, admin], getCount)
router.get('/:id', [authUsre, admin], getById)
router.post('/', [authUsre, admin], create)
router.put('/:id', [authUsre, admin], update)
router.delete('/:id', [authUsre, admin], remove)


module.exports = router

