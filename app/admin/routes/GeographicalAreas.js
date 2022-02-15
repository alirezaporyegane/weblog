const express = require('express'),
  router = express.Router(),
  { authUsre, admin } = require('../http/middleware/check-auth'),
  { getAll, getCount } = require('../http/controller/GeographicalAreas')

router.get('/', [authUsre, admin], getAll)
router.get('/count', [authUsre, admin], getCount)

module.exports = router
