const express = require('express'),
  router = express.Router(),
  { getAll, getCount, getById, create, update, remove } = require('../http/controller/Order'),
  { authUsre, admin } = require('../http/middleware/check-auth')

router.get('/', [authUsre, admin], getAll)
router.get('/count', [authUsre, admin], getCount)
router.post('/', [authUsre, admin], create)
router.get('/:id', [authUsre, admin], getById)
router.put('/:id', [authUsre, admin], update)
router.delete('/:id', [authUsre, admin], remove)

module.exports = router
