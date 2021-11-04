const express = require('express'),
router = express.Router(),
inventoriesController = require('../http/controller/Inventories'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/',[authUsre, admin], inventoriesController.getAll)
router.get('/count',[authUsre, admin], inventoriesController.getCount)
router.get('/:id',[authUsre, admin], inventoriesController.getById)
router.post('/',[authUsre, admin], inventoriesController.create)
router.put('/:id',[authUsre, admin], inventoriesController.update)
router.delete('/:id',[authUsre, admin], inventoriesController.remove)

module.exports = router