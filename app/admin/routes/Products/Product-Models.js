const express = require('express'),
  router = express.Router(),
  { getById, update, remove } = require('../../http/controller/Products/Product-Models'),
  { getAllArticle, createArticle } = require('../../http/controller/Products/Product-Articles'),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules')

// PRODUCTS MODELS
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

// PRODUCTS ARTICLES
router.get(
  '/:id/product-articles',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  getAllArticle
)

router.post(
  '/:id/product-articles',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  createArticle
)

module.exports = router
