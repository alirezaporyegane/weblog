const express = require('express'),
router = express.Router(),
{ getAll, updete } = require('../http/controller/Menu'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/',[authUsre, admin], getAll)
router.put('/',[authUsre, admin], updete)

module.exports = router