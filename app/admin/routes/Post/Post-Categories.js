const express = require('express'),
  router = express.Router(),
  { authUsre, admin } = require('../../http/middleware/check-auth'),
  { getAll, update } = require('../../http/controller/Post/Post-Categories')

router.get('/', [authUsre, admin], getAll)
router.put('/', [authUsre, admin], update)

module.exports = router
