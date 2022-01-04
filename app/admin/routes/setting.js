const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../http/middleware/check-auth'),
{ getAll, updateBranding } = require('../http/controller/Setting')

router.put('/branding', [authUsre, admin], updateBranding)
router.get('/', getAll)

module.exports = router