const express = require('express'),
  router = express.Router(),
  { authUsre, role } = require('../http/middleware/check-auth'),
  { getName, getById, UpdateById } = require('../http/controller/WidgetArea'),
  { hasModule } = require('../http/middleware/modules')

router.get('/names', [authUsre, role(['root', 'widgets']), hasModule(['widget'])], getName)
router.get('/:id', [authUsre, role(['root', 'widgets']), hasModule(['widget'])], getById)
router.put('/:id', [authUsre, role(['root', 'widgets']), hasModule(['widget'])], UpdateById)

module.exports = router
