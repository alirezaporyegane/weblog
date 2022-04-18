const express = require('express'),
  router = express.Router(),
  { getById, update, remove } = require('../../http/controller/Products/Product-Sale-Plans'),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules')

// PRODUCTS Artickles

router.get(
  '/:id',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  getById
)

router.put(
  '/:id',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  update
)
router.delete(
  '/:id',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  remove
)

module.exports = router
