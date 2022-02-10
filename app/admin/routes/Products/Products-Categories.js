const { Router } = require('express'),
  router = Router(),
  { authUsre, admin } = require('../../http/middleware/check-auth'),
  { getInfo, getById, update } = require('../../http/controller/Products/Product-Categories'),
  { hasModule } = require('../../http/middleware/modules')

router.get('/info', [authUsre, admin, hasModule(['products_categories'])], getInfo)
router.get('/:id', [authUsre, admin, hasModule(['products_categories'])], getById)
router.put('/:id', [authUsre, admin, hasModule(['products_categories'])], update)

module.exports = router
