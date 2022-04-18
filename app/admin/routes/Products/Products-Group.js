const { Router } = require('express'),
  router = Router(),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  {
    getAll,
    getCount,
    getInfo,
    getById,
    create,
    update,
    remove
  } = require('../../http/controller/Products/Products-Groups'),
  { getAllCategory, createCategory } = require('../../http/controller/Products/Product-Categories'),
  { hasModule } = require('../../http/middleware/modules')

// Product Groups
router.get(
  '/',
  [authUsre, role(['root', 'product', 'product-group']), hasModule(['products_groups'])],
  getAll
)
router.get(
  '/count',
  [authUsre, role(['root', 'product', 'product-group']), hasModule(['products_groups'])],
  getCount
)
router.get(
  '/info',
  [authUsre, role(['root', 'product', 'product-group']), hasModule(['products_groups'])],
  getInfo
)
router.get(
  '/:id',
  [authUsre, role(['root', 'product', 'product-group']), hasModule(['products_groups'])],
  getById
)
router.post(
  '/',
  [authUsre, role(['root', 'product', 'product-group']), hasModule(['products_groups'])],
  create
)
router.put(
  '/:id',
  [authUsre, role(['root', 'product', 'product-group']), hasModule(['products_groups'])],
  update
)
router.delete(
  '/:id',
  [authUsre, role(['root', 'product', 'product-group']), hasModule(['products_groups'])],
  remove
)

// Product Categories
router.get(
  '/:id/product-categories',
  [
    authUsre,
    role(['root', 'product', 'product-group', 'product-category']),
    hasModule(['products_categories'])
  ],
  getAllCategory
)

router.post(
  '/:id/product-categories',
  [
    authUsre,
    role(['root', 'product', 'product-group', 'product-category']),
    hasModule(['products_categories'])
  ],
  createCategory
)

module.exports = router
