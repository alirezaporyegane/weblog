const express = require('express'),
  router = express.Router(),
  { getById, update, remove } = require('../../http/controller/Products/Product-Articles'),
  {
    getAllSalePlans,
    createSalePlans
  } = require('../../http/controller/Products/Product-Sale-Plans'),
  { getAllPackage, createPackage } = require('../../http/controller/Products/Product-Packages'),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules')

// PRODUCTS ARTICLES
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

// PRODUCT SALE PLANS
router.get(
  '/:id/sale-plans',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  getAllSalePlans
)

router.post(
  '/:id/sale-plans',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  createSalePlans
)

// PRODUCT PACKAGE
router.get(
  '/:id/product-packages',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  getAllPackage
)

router.post(
  '/:id/product-packages',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  createPackage
)

module.exports = router
