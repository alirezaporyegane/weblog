const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../http/middleware/check-auth'),
settingController = require('../http/controller/Setting')

router.get('/', [authUsre, admin], settingController.getAll)
router.put('/', [authUsre, admin], settingController.update)

module.exports = router