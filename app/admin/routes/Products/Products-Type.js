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
  } = require('../../http/controller/Products/Products-Type'),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules')

// products type
router.get(
  '/',
  [
    authUsre,
    role(['root', 'product', 'product-type']),
    hasModule([
      'products_types',
      'units',
      'products_colors',
      'products_sizes',
      'products_tabs',
      'products_rates'
    ])
  ],
  getAll
)

router.get(
  '/info',
  [
    authUsre,
    role(['root', 'product', 'product-type']),
    hasModule([
      'products_types',
      'units',
      'products_colors',
      'products_sizes',
      'products_tabs',
      'products_rates'
    ])
  ],
  getInfo
)

router.get(
  '/count',
  [
    authUsre,
    role(['root', 'product', 'product-type']),
    hasModule([
      'products_types',
      'units',
      'products_colors',
      'products_sizes',
      'products_tabs',
      'products_rates'
    ])
  ],
  getCount
)

router.get(
  '/:id',
  [
    authUsre,
    role(['root', 'product', 'product-type']),
    hasModule([
      'products_types',
      'units',
      'products_colors',
      'products_sizes',
      'products_tabs',
      'products_rates'
    ])
  ],
  getById
)

router.post(
  '/',
  [
    authUsre,
    role(['root', 'product', 'product-type']),
    hasModule([
      'products_types',
      'units',
      'products_colors',
      'products_sizes',
      'products_tabs',
      'products_rates'
    ])
  ],
  create
)

router.put(
  '/:id',
  [
    authUsre,
    role(['root', 'product', 'product-type']),
    hasModule([
      'products_types',
      'units',
      'products_colors',
      'products_sizes',
      'products_tabs',
      'products_rates'
    ])
  ],
  update
)

router.delete(
  '/:id',
  [
    authUsre,
    role(['root', 'product', 'product-type']),
    hasModule([
      'products_types',
      'units',
      'products_colors',
      'products_sizes',
      'products_tabs',
      'products_rates'
    ])
  ],
  remove
)

module.exports = router
