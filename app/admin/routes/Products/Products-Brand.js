const express = require('express'),
  router = express.Router(),
  {
    getAll,
    getinfo,
    getCount,
    getById,
    create,
    update,
    remove
  } = require('../../http/controller/Products/Products-Brand'),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules')

router.get(
  '/',
  [authUsre, role(['root', 'product', 'product-brand']), hasModule(['brands'])],
  getAll
)
router.get(
  '/info',
  [authUsre, role(['root', 'product', 'product-brand']), hasModule(['brands'])],
  getinfo
)
router.get(
  '/count',
  [authUsre, role(['root', 'product', 'product-brand']), hasModule(['brands'])],
  getCount
)
router.get(
  '/:id',
  [authUsre, role(['root', 'product', 'product-brand']), hasModule(['brands'])],
  getById
)
router.post(
  '/',
  [authUsre, role(['root', 'product', 'product-brand']), hasModule(['brands'])],
  create
)
router.put(
  '/:id',
  [authUsre, role(['root', 'product', 'product-brand']), hasModule(['brands'])],
  update
)
router.delete(
  '/:brandId',
  [authUsre, role(['root', 'product', 'product-brand']), hasModule(['brands'])],
  remove
)

module.exports = router
