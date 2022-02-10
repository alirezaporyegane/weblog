const router = require('express').Router()

router.use('/module', require('./Module'))
router.use('/key', require('./key'))

module.exports = router
