const express = require('express'),
  router = express.Router(),
  { authUsre, admin } = require('../http/middleware/check-auth'),
  { seedLoaction } = require('../http/controller/Maintenance')

router.post('/seed-location', [authUsre, admin], seedLoaction)

module.exports = router
