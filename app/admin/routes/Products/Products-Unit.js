const express = require('express'),
  router = express.Router(),
  {
    getAll,
    getInfo,
    getCount,
    getById,
    create,
    update,
    remove
  } = require('../../http/controller/Products/Products-Unit'),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules')

// PRODUCTS UNIT
router.get(
  '/',
  [authUsre, role(['root', 'product', 'product-units']), hasModule(['units'])],
  getAll
)
router.get(
  '/info',
  [authUsre, role(['root', 'product', 'product-units']), hasModule(['units'])],
  getInfo
)
router.get(
  '/count',
  [authUsre, role(['root', 'product', 'product-units']), hasModule(['units'])],
  getCount
)
router.get(
  '/:id',
  [authUsre, role(['root', 'product', 'product-units']), hasModule(['units'])],
  getById
)
router.post(
  '/',
  [authUsre, role(['root', 'product', 'product-units']), hasModule(['units'])],
  create
)
router.put(
  '/:id',
  [authUsre, role(['root', 'product', 'product-units']), hasModule(['units'])],
  update
)
router.delete(
  '/:id',
  [authUsre, role(['root', 'product', 'product-units']), hasModule(['units'])],
  remove
)

module.exports = router
