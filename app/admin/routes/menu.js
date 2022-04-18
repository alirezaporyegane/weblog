const express = require('express'),
  router = express.Router(),
  { getAll, updete } = require('../http/controller/Menu'),
  { authUsre, role } = require('../http/middleware/check-auth'),
  { hasModule } = require('../http/middleware/modules')

router.get('/', [authUsre, role(['root', 'menu']), hasModule(['menus'])], getAll)
router.put('/', [authUsre, role(['root', 'menu']), hasModule(['menus'])], updete)

module.exports = router
