const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../http/middleware/check-auth'),
postCategoriesController = require('../http/controller/PostCategories');

router.get('/', [authUsre, admin], postCategoriesController.getAll)
router.get('/count', [authUsre, admin], postCategoriesController.getCount)
router.get('/:id', [authUsre, admin], postCategoriesController.getById)
router.post('/', [authUsre, admin], postCategoriesController.create)
router.put('/:id', [authUsre, admin], postCategoriesController.update)
router.delete('/:id', [authUsre, admin], postCategoriesController.remove)

module.exports = router