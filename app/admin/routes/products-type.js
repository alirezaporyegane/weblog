const { Router } = require('express'),
router = Router(),
{ getAll, getInfo, getCount, getById, create, update, remove } = require('../http/controller/Products-Type'),
{ authUsre, admin } = require('../http/middleware/check-auth')

// products type
router.get('/', [authUsre, admin], getAll)
router.get('/info', getInfo)
router.get('/count', [authUsre, admin], getCount)
router.get('/:id', [authUsre, admin], getById)
router.post('/', create)
router.put('/:id', [authUsre, admin], update)
router.delete('/:id', [authUsre, admin], remove)


module.exports = router

