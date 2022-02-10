const express = require('express'),
  router = express.Router(),
  { getLicence } = require('../controller/Module')

router.get('/', getLicence)

module.exports = router
