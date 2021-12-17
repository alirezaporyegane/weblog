const express = require('express');
const router = express.Router();

const mainRoutes = require('./Menu');
const postRoutes = require('./Posts');
const postCategoriesRoutes = require('./PostCategories');

router.use('/menus', mainRoutes)
router.use('/post', postRoutes)
router.use('/post-categories', postCategoriesRoutes)


module.exports = router;