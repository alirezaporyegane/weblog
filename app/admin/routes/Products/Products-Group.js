const { Router } = require('express'),
  router = Router(),
  { authUsre, admin } = require('../../http/middleware/check-auth'),
  {
    getAll,
    getCount,
    getInfo,
    getById,
    create,
    update,
    remove,
    getAllCategory,
    updateAllCategories,
    updateByIdCategories,
    getByIdCategories,
  } = require('../../http/controller/Products/Products-Groups'),
  { hasModule } = require('../../http/middleware/modules')

// Product Groups
router.get('/', [authUsre, admin, hasModule(['products_groups'])], getAll)
router.get('/count', [authUsre, admin, hasModule(['products_groups'])], getCount)
router.get('/info', [authUsre, admin, hasModule(['products_groups'])], getInfo)
router.get('/:id', [authUsre, admin, hasModule(['products_groups'])], getById)
router.post('/', [authUsre, admin, hasModule(['products_groups'])], create)
router.put('/:id', [authUsre, admin, hasModule(['products_groups'])], update)
router.delete('/:id', [authUsre, admin, hasModule(['products_groups'])], remove)

// Product Categories
router.get(
  '/:id/product-categories',
  [authUsre, admin, hasModule(['products_categories'])],
  getAllCategory
)
router.put(
  '/:id/product-categories',
  [authUsre, admin, hasModule(['products_categories'])],
  updateAllCategories
)
router.get(
  '/:groupId/product-categories/:categoryId',
  [authUsre, admin, hasModule(['products_categories'])],
  getByIdCategories
)
router.put(
  '/:groupId/product-categories/:categoryId',
  [authUsre, admin, hasModule(['products_categories'])],
  updateByIdCategories
)

module.exports = router
