const { Router } = require('express'),
router = Router(),
{ authUsre, admin } = require('../../http/middleware/check-auth'),
{ getAll, getCount, getInfo, getById, create, update, remove } = require('../../http/controller/Products/Products-Groups');

router.get('/', [authUsre, admin], getAll)
router.get('/count', [authUsre, admin], getCount)
router.get('/info', [authUsre, admin], getInfo)
router.get('/:id', [authUsre, admin], getById)
router.post('/', [authUsre, admin], create)
router.put('/:id', [authUsre, admin], update)
router.delete('/:id', [authUsre, admin], remove)

module.exports = router