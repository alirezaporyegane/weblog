const express = require('express'),
  router = express.Router(),
  {
    getAll,
    getById,
    getCount,
    create,
    update,
    remove
  } = require('../http/controller/DeliveryMethods'),
  { hasModule } = require('../http/middleware/modules'),
  { authUsre, role } = require('../http/middleware/check-auth')

router.get(
  '/',
  [authUsre, role(['root', 'product', 'delivery']), hasModule(['currencies'])],
  getAll
)
router.get(
  '/count',
  [authUsre, role(['root', 'product', 'delivery']), hasModule(['currencies'])],
  getCount
)
router.get(
  '/:id',
  [authUsre, role(['root', 'product', 'delivery']), hasModule(['currencies'])],
  getById
)
router.post(
  '/',
  [authUsre, role(['root', 'product', 'delivery']), hasModule(['currencies'])],
  create
)
router.put(
  '/:id',
  [authUsre, role(['root', 'product', 'delivery']), hasModule(['currencies'])],
  update
)
router.delete(
  '/:id',
  [authUsre, role(['root', 'product', 'delivery']), hasModule(['currencies'])],
  remove
)

module.exports = router
