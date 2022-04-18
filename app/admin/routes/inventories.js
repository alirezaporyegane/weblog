const express = require('express'),
  router = express.Router(),
  { hasModule } = require('../http/middleware/modules'),
  {
    getAll,
    getCount,
    getInfo,
    getById,
    create,
    update,
    remove
  } = require('../http/controller/Inventories'),
  { authUsre, role } = require('../http/middleware/check-auth')

router.get('/', [authUsre, role(['root', 'inventories']), hasModule(['inventories'])], getAll)
router.get('/info', [authUsre, role(['root', 'inventories']), hasModule(['inventories'])], getInfo)
router.get(
  '/count',
  [authUsre, role(['root', 'inventories']), hasModule(['inventories'])],
  getCount
)
router.get('/:id', [authUsre, role(['root', 'inventories']), hasModule(['inventories'])], getById)
router.post('/', [authUsre, role(['root', 'inventories']), hasModule(['inventories'])], create)
router.put('/:id', [authUsre, role(['root', 'inventories']), hasModule(['inventories'])], update)
router.delete('/:id', [authUsre, role(['root', 'inventories']), hasModule(['inventories'])], remove)

module.exports = router
