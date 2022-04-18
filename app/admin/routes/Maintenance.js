const express = require('express'),
  router = express.Router(),
  { authUsre, role } = require('../http/middleware/check-auth'),
  { seedLoaction } = require('../http/controller/Maintenance')

router.post('/seed-location', [authUsre, role(['root'])], seedLoaction)

module.exports = router
