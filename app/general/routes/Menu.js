const express = require('express');
const router = express.Router();
const { getAll } = require('../Controllers/Menu');

router.get('/', getAll)

module.exports = router;