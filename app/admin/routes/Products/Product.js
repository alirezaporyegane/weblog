const express = require('express'),
  router = express.Router(),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  {
    getAll,
    getCount,
    getById,
    create,
    remove,
    basicPatch,
    categoriesPatch,
    seoPatch,
    displayPatch,
    auditPatch,
    relationsPost,
    archivePatch
  } = require('../../http/controller/Products/Products'),
  { getAllModels, createModels } = require('../../http/controller/Products/Product-Models'),
  { hasModule } = require('../../http/middleware/modules')

router.get(
  '/',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  getAll
)
router.get(
  '/count',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  getCount
)
router.get(
  '/:id',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  getById
)
router.post(
  '/',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  create
)
router.delete(
  '/:id',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  remove
)

router.patch(
  '/:id/basic',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  basicPatch
)

router.get(
  '/:id/models',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  getAllModels
)

router.post(
  '/:id/models',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  createModels
)

router.patch(
  '/:id/categories',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  categoriesPatch
)

router.patch(
  '/:id/seo',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  seoPatch
),
  router.patch(
    '/:id/display',
    [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
    displayPatch
  )

router.patch(
  '/:id/audit',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  auditPatch
)

router.post(
  '/:id/relations',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  relationsPost
)

router.patch(
  '/:id/archive',
  [authUsre, role(['root', 'product']), hasModule(['products', 'products_sale'])],
  archivePatch
)

module.exports = router
