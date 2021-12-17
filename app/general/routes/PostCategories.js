const express = require('express');
const router = express.Router();
const { getAll, getBySlug } = require('../Controllers/PostCategories');

router.get('/', getAll)
router.get('/slug/:slug', getBySlug)

module.exports = router;