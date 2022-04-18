const express = require('express'),
  {
    register,
    login,
    sendCode,
    getCode,
    changeEmail,
    changePhoneNumber
  } = require('../http/controller/Account'),
  router = express.Router(),
  { authUsre } = require('../../admin/http/middleware/check-auth')

router.post('/register', register)
router.post('/login', login)
router.post('/send-code', authUsre, sendCode)
router.post('/get-code', authUsre, getCode)
router.post('/change-email', authUsre, changeEmail)
router.post('/change-phone-number', authUsre, changePhoneNumber)

module.exports = router
