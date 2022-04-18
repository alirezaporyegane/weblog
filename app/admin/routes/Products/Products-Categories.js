const { Router } = require('express'),
  router = Router(),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { getById, update, remove } = require('../../http/controller/Products/Product-Categories'),
  { hasModule } = require('../../http/middleware/modules')

router.get(
  '/:id',
  [authUsre, role(['root', 'product', 'product-category']), hasModule(['products_categories'])],
  getById
)
router.put(
  '/:id',
  [authUsre, role(['root', 'product', 'product-category']), hasModule(['products_categories'])],
  update
)
router.delete(
  '/:id',
  [authUsre, role(['root', 'product', 'product-category']), hasModule(['products_categories'])],
  remove
)

module.exports = router
