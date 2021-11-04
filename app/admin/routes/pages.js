const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../http/middleware/check-auth'),
pagesController = require('../http/controller/Pages')

router.get('/', [authUsre, admin], pagesController.getone)
router.post('/', [authUsre, admin], pagesController.create)
router.put('/', [authUsre, admin], pagesController.update)

module.exports = router