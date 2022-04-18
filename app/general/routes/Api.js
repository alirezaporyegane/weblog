const express = require('express')
const router = express.Router()

router.use('/menus', require('./Menu'))
router.use('/products', require('./Products'))
router.use('/pages/home-page', require('./HomePage'))
router.use('/pages', require('./Pages'))
router.use('/post-categories', require('./PostCategories'))
router.use('/post', require('./Posts'))
router.use('/widget-areas', require('./WidgetArea'))

module.exports = router
