const express = require('express'),
  router = express.Router(),
  { update, remove } = require('../controller/Key')

router.put('/', update)
router.delete('/', remove)

module.exports = router
