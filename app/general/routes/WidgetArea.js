const express = require('express');
const router = express.Router();
const { getWidget } = require('../Controllers/WidgetArea');

router.get('/:id', getWidget)

module.exports = router;