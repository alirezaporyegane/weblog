const express = require('express'),
  router = express.Router(),
  { authUsre, role } = require('../http/middleware/check-auth'),
  { getAll, updateBranding } = require('../http/controller/Setting')

router.put('/branding', [authUsre, role(['root'])], updateBranding)
router.get('/', getAll)

module.exports = router
