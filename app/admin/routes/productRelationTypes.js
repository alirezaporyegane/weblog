const express = require('express'),
router = express.Router(),
productRelationTypesController = require('../http/controller/ProductRelationTypes'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/',[authUsre, admin], productRelationTypesController.getAll)
router.get('/count',[authUsre, admin], productRelationTypesController.getCount)
router.get('/:id',[authUsre, admin], productRelationTypesController.getById)
router.post('/',[authUsre, admin], productRelationTypesController.create)
router.put('/:id',[authUsre, admin], productRelationTypesController.update)
router.delete('/:id',[authUsre, admin], productRelationTypesController.remove)

module.exports = router