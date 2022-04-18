const express = require('express'),
  router = express.Router(),
  { getAll, getCount, getById, create, update, remove } = require('../http/controller/Order'),
  { authUsre, role } = require('../http/middleware/check-auth')

router.get('/', [authUsre, role(['role', 'orders'])], getAll)
router.get('/count', [authUsre, role(['role', 'orders'])], getCount)
router.post('/', [authUsre, role(['role', 'orders'])], create)
router.get('/:id', [authUsre, role(['role', 'orders'])], getById)
router.put('/:id', [authUsre, role(['role', 'orders'])], update)
router.delete('/:id', [authUsre, role(['role', 'orders'])], remove)

module.exports = router
