const express = require('express'),
  router = express.Router(),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { getHomePage, updateHomePage } = require('../../http/controller/Pages/HomePage')

router.get('/', [authUsre, role(['root', 'pages'])], getHomePage)
router.put('/', [authUsre, role(['root', 'pages'])], updateHomePage)

module.exports = router
