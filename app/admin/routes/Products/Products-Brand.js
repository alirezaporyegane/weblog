const express = require('express'),
  router = express.Router(),
  {
    getAll,
    getinfo,
    getCount,
    getById,
    create,
    update,
    remove,
  } = require('../../http/controller/Products/Products-Brand'),
  { authUsre, admin } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules')

router.get('/', [authUsre, admin, hasModule(['brands'])], getAll)
router.get('/info', [authUsre, admin, hasModule(['brands'])], getinfo)
router.get('/count', [authUsre, admin, hasModule(['brands'])], getCount)
router.get('/:id', [authUsre, admin, hasModule(['brands'])], getById)
router.post('/', [authUsre, admin, hasModule(['brands'])], create)
router.put('/:id', [authUsre, admin, hasModule(['brands'])], update)
router.delete('/:brandId', [authUsre, admin, hasModule(['brands'])], remove)

module.exports = router
