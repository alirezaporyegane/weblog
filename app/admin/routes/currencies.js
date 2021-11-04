const express = require('express'),
router = express.Router(),
currenciesController = require('../http/controller/Currencies'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/', [authUsre, admin], currenciesController.getAll)
router.get('/count', [authUsre, admin], currenciesController.getCount)
router.put('/setting', [authUsre, admin], currenciesController.updateBaseCurrency)
router.get('/setting', [authUsre, admin], currenciesController.getBaseCurrency)
router.get('/:id', [authUsre, admin], currenciesController.getById)
router.post('/', [authUsre, admin], currenciesController.create)
router.put('/:id', [authUsre, admin], currenciesController.update)
router.delete('/:id', [authUsre, admin], currenciesController.remove)

module.exports = router