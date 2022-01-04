const express = require('express');
const router = express.Router();
const { getPages } = require('../Controllers/Pages');

router.get('/:slug', getPages)

module.exports = router;