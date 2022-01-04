const router = require('express').Router()

router.use('/bank-accounts', require('./Bank-Accounts'));
router.use('/banks', require('./Banks'));
router.use('/brands', require('./Products/Products-Brand'));
router.use('/currencies', require('./Currencies'));
router.use('/customers', require('./Customers'));
router.use('/delivery-methods', require('./Delivery-Methods'));
router.use('/files', require('./Files'));
router.use('/inventories', require('./Inventories'));
router.use('/menu', require('./Menu'));
router.use('/orders', require('./Order'));
router.use('/pages', require('./Pages/Pages'));
router.use('/pages/home-page', require('./Pages/HomePage'));
router.use('/post-categories', require('./Post/Post-Categories'));
router.use('/posts', require('./Post/Post'));
router.use('/product-categories', require('./Products/Products-Categories'));
router.use('/product-group', require('./Products/Products-Group'));
router.use('/product-relation-types', require('./Products/Product-Relation-Types'));
router.use('/product-type', require('./Products/Products-Type'));
router.use('/product-unit', require('./Products/Products-Unit'));
router.use('/products', require('./Products/Product'));
router.use('/setting', require('./Setting'));
router.use('/user', require('./User'));
router.use('/widget-areas', require('./WidgetArea'));

module.exports = router