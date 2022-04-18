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
  } = require('../../http/controller/Products/Product-Relation-Types'),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules')

router.get(
  '/',
  [authUsre, role(['root', 'product', 'product-relation']), hasModule(['products_relations'])],
  getAll
)
router.get(
  '/info',
  [authUsre, role(['root', 'product', 'product-relation']), hasModule(['products_relations'])],
  getInfo
)
router.get(
  '/count',
  [authUsre, role(['root', 'product', 'product-relation']), hasModule(['products_relations'])],
  getCount
)
router.get(
  '/:id',
  [authUsre, role(['root', 'product', 'product-relation']), hasModule(['products_relations'])],
  getById
)
router.post(
  '/',
  [authUsre, role(['root', 'product', 'product-relation']), hasModule(['products_relations'])],
  create
)
router.put(
  '/:id',
  [authUsre, role(['root', 'product', 'product-relation']), hasModule(['products_relations'])],
  update
)
router.delete(
  '/:id',
  [authUsre, role(['root', 'product', 'product-relation']), hasModule(['products_relations'])],
  remove
)

module.exports = router
