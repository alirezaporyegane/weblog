const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../../http/middleware/check-auth'),
{ getHomePage, updateHomePage } = require('../../http/controller/Pages/HomePage')

router.get('/', [authUsre, admin], getHomePage)
router.put('/', [authUsre, admin], updateHomePage)

module.exports = router