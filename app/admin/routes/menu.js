const express = require('express'),
router = express.Router(),
menuController = require('../http/controller/Menu'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/',[authUsre, admin], menuController.getAll)
router.get('/:id',[authUsre, admin], menuController.getById)
router.post('/',[authUsre, admin], menuController.create)
router.put('/:id',[authUsre, admin], menuController.updete)
router.delete('/:id',[authUsre, admin], menuController.delete)

module.exports = router