const express = require('express'),
  router = express.Router(),
  { hasModule } = require('../http/middleware/modules'),
  {
    getAll,
    getCount,
    getInfo,
    getById,
    create,
    updated,
    remove
  } = require('../http/controller/Sellers'),
  { authUsre, role } = require('../http/middleware/check-auth')

router.get(
  '/',
  [authUsre, role(['root', 'seller']), hasModule(['products_sale', 'sellers'])],
  getAll
)
router.get(
  '/info',
  [authUsre, role(['root', 'seller']), hasModule(['products_sale', 'sellers'])],
  getInfo
)
router.get(
  '/count',
  [authUsre, role(['root', 'seller']), hasModule(['products_sale', 'sellers'])],
  getCount
)
router.get(
  '/:id',
  [authUsre, role(['root', 'seller']), hasModule(['products_sale', 'sellers'])],
  getById
)
router.post(
  '/',
  [authUsre, role(['root', 'seller']), hasModule(['products_sale', 'sellers'])],
  create
)
router.put(
  '/:id',
  [authUsre, role(['root', 'seller']), hasModule(['products_sale', 'sellers'])],
  updated
)
router.delete(
  '/:id',
  [authUsre, role(['root', 'seller']), hasModule(['products_sale', 'sellers'])],
  remove
)

module.exports = router
