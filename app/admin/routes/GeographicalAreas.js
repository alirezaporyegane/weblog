const express = require('express'),
  router = express.Router(),
  { authUsre, role } = require('../http/middleware/check-auth'),
  { getAll, getCount } = require('../http/controller/GeographicalAreas')

router.get('/', [authUsre, role(['root'])], getAll)
router.get('/count', [authUsre, role(['root'])], getCount)

module.exports = router
