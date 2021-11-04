const express = require('express'),
router = express.Router(),
deliveryMethodsController = require('../http/controller/DeliveryMethods'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/', [authUsre, admin], deliveryMethodsController.getAll)
router.get('/count', [authUsre, admin], deliveryMethodsController.getCount)
router.get('/:id', [authUsre, admin], deliveryMethodsController.getById)
router.post('/', [authUsre, admin], deliveryMethodsController.create)
router.put('/:id', [authUsre, admin], deliveryMethodsController.update)
router.delete('/:id', [authUsre, admin], deliveryMethodsController.remove)

module.exports = router