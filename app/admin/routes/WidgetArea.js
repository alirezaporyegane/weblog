const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../http/middleware/check-auth'),
{ getName, getById, UpdateById } = require('../http/controller/WidgetArea'),
{ hasModule } = require('../http/middleware/modules');


router.get('/names', [authUsre, admin, hasModule(["widget"])], getName)
router.get('/:id', [authUsre, admin, hasModule(["widget"])], getById)
router.put('/:id', [authUsre, admin, hasModule(["widget"])], UpdateById)

module.exports = router