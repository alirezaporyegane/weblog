const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../http/middleware/check-auth'),
{ getone, create, update } = require('../http/controller/Pages')

router.get('/', [authUsre, admin], getone)
router.post('/', [authUsre, admin], create)
router.put('/', [authUsre, admin], update)

module.exports = router