const express = require('express'),
  router = express.Router(),
  { getAll, getCount, getById, create, updated, remove } = require('../http/controller/Customer'),
  { authUsre, admin } = require('../http/middleware/check-auth')

router.get('/', [authUsre, admin], getAll)
router.get('/count', [authUsre, admin], getCount)
router.get('/:id', [authUsre, admin], getById)
router.post('/', [authUsre, admin], create)
router.put('/:id', [authUsre, admin], updated)
router.delete('/:id', [authUsre, admin], remove)

module.exports = router
