const express = require('express');
const router = express.Router();
const { getHome } = require('../Controllers/HomePage');

router.get('/', getHome)

module.exports = router;