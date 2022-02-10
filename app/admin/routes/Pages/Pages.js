const express = require('express'),
  router = express.Router(),
  { authUsre, admin } = require('../../http/middleware/check-auth'),
  {
    getAll,
    getCount,
    getById,
    create,
    update,
    remove,
  } = require('../../http/controller/Pages/Pages'),
  { hasModule } = require('../../http/middleware/modules')

router.get('/', [authUsre, admin, hasModule(['pages'])], getAll)
router.get('/count', [authUsre, admin, hasModule(['pages'])], getCount)
router.get('/:id', [authUsre, admin, hasModule(['pages'])], getById)
router.post('/', [authUsre, admin, hasModule(['pages'])], create)
router.put('/:id', [authUsre, admin, hasModule(['pages'])], update)
router.delete('/:id', [authUsre, admin, hasModule(['pages'])], remove)

module.exports = router
