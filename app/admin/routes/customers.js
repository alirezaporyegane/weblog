const express = require('express'),
  router = express.Router(),
  { hasModule } = require('../http/middleware/modules'),
  { getAll, getCount, getById, create, updated, remove } = require('../http/controller/Customer'),
  { authUsre, role } = require('../http/middleware/check-auth')

router.get('/', [authUsre, role(['root', 'customers']), hasModule(['products_sale'])], getAll)
router.get('/count', [authUsre, role(['root', 'customers']), hasModule(['products_sale'])], getCount)
router.get('/:id', [authUsre, role(['root', 'customers']), hasModule(['products_sale'])], getById)
router.post('/', [authUsre, role(['root', 'customers']), hasModule(['products_sale'])], create)
router.put('/:id', [authUsre, role(['root', 'customers']), hasModule(['products_sale'])], updated)
router.delete('/:id', [authUsre, role(['root', 'customers']), hasModule(['products_sale'])], remove)

module.exports = router
