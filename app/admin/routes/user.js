const express = require('express'),
userController = require('../http/controller/User'),
router =  express.Router(),
{ authUsre } = require('../http/middleware/check-auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/sendCode', authUsre, userController.sendCode)
router.post('/getCode', authUsre, userController.getCode)

module.exports = router