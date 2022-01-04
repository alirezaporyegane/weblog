const express = require('express'),
router = express.Router(),
{ getAll, getInfo, getCount, getById, create, update, remove } = require('../../http/controller/Products/Products-Unit'),
{ authUsre, admin } = require('../../http/middleware/check-auth'),
{ hasModule } = require('../../http/middleware/modules');

// PRODUCTS UNIT
router.get('/', [authUsre, admin, hasModule(['units'])], getAll)
router.get('/info', [authUsre, admin, hasModule(['units'])], getInfo)
router.get('/count', [authUsre, admin, hasModule(['units'])], getCount)
router.get('/:id', [authUsre, admin, hasModule(['units'])], getById)
router.post('/', [authUsre, admin, hasModule(['units'])], create)
router.put('/:id', [authUsre, admin, hasModule(['units'])], update)
router.delete('/:id', [authUsre, admin, hasModule(['units'])], remove)


module.exports = router

