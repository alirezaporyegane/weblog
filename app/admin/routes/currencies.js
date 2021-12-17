const express = require('express'),
router = express.Router(),
{ getAll, getInfo, getCount, getById, create, update, remove, getBaseCurrency, updateBaseCurrency } = require('../http/controller/Currencies'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/', [authUsre, admin], getAll)
router.get('/info', [authUsre, admin], getInfo)
router.get('/count', [authUsre, admin], getCount)
router.get('/setting', [authUsre, admin], getBaseCurrency)
router.put('/setting', [authUsre, admin], updateBaseCurrency)
router.get('/:id', [authUsre, admin], getById)
router.post('/', [authUsre, admin], create)
router.put('/:id', [authUsre, admin], update)
router.delete('/:id', [authUsre, admin], remove)

module.exports = router