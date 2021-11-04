const express = require('express'),
router = express.Router(),
customerController = require('../http/controller/Customer'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/', [authUsre, admin], customerController.getAll)
router.get('/count', [authUsre, admin], customerController.getCount)
router.get('/:id', [authUsre, admin], customerController.getById)
router.post('/', [authUsre, admin], customerController.create)
router.put('/:id', [authUsre, admin], customerController.updated)
router.delete('/:id', [authUsre, admin], customerController.delete)

module.exports = router