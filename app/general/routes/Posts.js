const express = require('express');
const router = express.Router();
const { getAll, getCount, getBySlug } = require('../Controllers/Posts');

router.get('/published', getAll)
router.get('/count', getCount)
router.get('/slug/:slug', getBySlug)

module.exports = router;