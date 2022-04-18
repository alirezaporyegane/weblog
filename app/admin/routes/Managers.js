const express = require('express'),
  router = express.Router(),
  { hasModule } = require('../http/middleware/modules'),
  {
    getAll,
    getCount,
    getByToken,
    UpdateByToken,
    getStatusByToken,
    getById,
    create,
    updated,
    remove
  } = require('../http/controller/Managers'),
  { authUsre, role } = require('../http/middleware/check-auth')

router.get('/', [authUsre, role(['root']), hasModule(['managers'])], getAll)
router.get('/count', [authUsre, role(['root']), hasModule(['managers'])], getCount)
router.get('/my', [authUsre], getByToken)
router.put('/my', [authUsre], UpdateByToken)
router.get('/my/status', [authUsre], getStatusByToken)
router.get('/:id', [authUsre, role(['root']), hasModule(['managers'])], getById)
router.post('/', [authUsre, role(['root']), hasModule(['managers'])], create)
router.put('/:id', [authUsre, role(['root']), hasModule(['managers'])], updated)
router.delete('/:id', [authUsre, role(['root']), hasModule(['managers'])], remove)

module.exports = router
