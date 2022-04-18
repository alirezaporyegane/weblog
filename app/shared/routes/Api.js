const router = require('express').Router()

router.use('/account', require('./Account'))

module.exports = router
