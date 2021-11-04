const express = require('express'),
router = express.Router(),
setController = require('../http/controller/Set');

router.get('/', setController.getAll)
router.put('/', setController.updete)

module.exports = router

