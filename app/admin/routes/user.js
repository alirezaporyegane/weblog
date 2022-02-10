const express = require('express'),
  { register, login, sendCode, getCode, statusUser } = require('../http/controller/User'),
  router = express.Router(),
  { authUsre } = require('../http/middleware/check-auth')

router.post('/register', register)
router.post('/login', login)
router.get('/sendCode', authUsre, sendCode)
router.post('/getCode', authUsre, getCode)
router.get('/status', authUsre, statusUser)

module.exports = router
