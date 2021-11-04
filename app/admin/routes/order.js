const express = require('express'),
router = express.Router(),
OrderController = require('../http/controller/Order'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/', [authUsre, admin], OrderController.getAll)
router.get('/count', [authUsre, admin], OrderController.getCount)
router.post('/', [authUsre, admin], OrderController.create)
router.get('/:id', [authUsre, admin], OrderController.getById)
router.put('/:id', [authUsre, admin], OrderController.update)
router.delete('/:id', [authUsre, admin], OrderController.remove)

module.exports = router