const router = require('express').Router()

const bankAccountsRoutes = require('./bank-accounts');
const banksRoutes = require('./banks');
const brandRoutes = require('./brand');
const currenciesRoutes = require('./currencies');
const customerRoutes = require('./customers');
const deliveryMethodsRoutes = require('./deliveryMethods');
const fileRoutes = require('./files');
const inventoriesRoutes = require('./inventories');
const menuRoutes = require('./menu');
const orderRoutes = require('./order');
const pagesRoutes = require('./pages'); 
const postCategoriesRoutes = require('./postCategories');
const postRoutes = require('./post');
const productRelationTypesRoutes = require('./productRelationTypes');
const productsRoutes = require('./product');
const productsSetTypeRoutes = require('./products-type');
const productsUnitRoutes = require('./products-unit');
const settingRoutes = require('./setting');
const userRoutes = require('./user');
const SetRoutes = require('./Set')

router.use('/bank-accounts', bankAccountsRoutes);
router.use('/banks', banksRoutes);
router.use('/brands', brandRoutes);
router.use('/currencies', currenciesRoutes);
router.use('/customers', customerRoutes);
router.use('/delivery-methods', deliveryMethodsRoutes);
router.use('/files', fileRoutes);
router.use('/inventories', inventoriesRoutes);
router.use('/menu', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/pages/home-page', pagesRoutes);
router.use('/post-categories', postCategoriesRoutes);
router.use('/posts', postRoutes);
router.use('/product-relation-types', productRelationTypesRoutes);
router.use('/product-set-type', productsSetTypeRoutes);
router.use('/product-unit', productsUnitRoutes);
router.use('/products', productsRoutes);
router.use('/setting', settingRoutes);
router.use('/user', userRoutes);
// router.use('/set', SetRoutes);

module.exports = router