const express = require('express'),
  router = express.Router(),
  { getAll, updete } = require('../http/controller/Menu'),
  { authUsre, admin } = require('../http/middleware/check-auth'),
  { hasModule } = require('../http/middleware/modules')

router.get('/', [authUsre, admin, hasModule(['menus'])], getAll)
router.put('/', [authUsre, admin, hasModule(['menus'])], updete)

module.exports = router
