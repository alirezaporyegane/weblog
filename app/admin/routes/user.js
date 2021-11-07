const { Router } = require('express'),
router = Router(),
{ getCode, sendCode, login, register } = require('../http/controller/User'),
{ authUsre } = require('../http/middleware/check-auth')

router.post('/register', register)
router.post('/login', login)
router.get('/sendCode', authUsre, sendCode)
router.post('/getCode', authUsre, getCode)

module.exports = router