const express = require('express'),
  router = express.Router(),
  {
    getAll,
    getInfo,
    getCount,
    getById,
    create,
    update,
    remove,
    getBaseCurrency,
    updateBaseCurrency
  } = require('../http/controller/Currencies'),
  { hasModule } = require('../http/middleware/modules'),
  { authUsre, role } = require('../http/middleware/check-auth')

router.get('/', [authUsre, role(['root', 'currencies']), hasModule(['currencies'])], getAll)
router.get('/info', [authUsre, role(['root', 'currencies']), hasModule(['currencies'])], getInfo)
router.get('/count', [authUsre, role(['root', 'currencies']), hasModule(['currencies'])], getCount)
router.get(
  '/setting',
  [authUsre, role(['root', 'currencies']), hasModule(['currencies'])],
  getBaseCurrency
)
router.put(
  '/setting',
  [authUsre, role(['root', 'currencies'], hasModule(['currencies']))],
  updateBaseCurrency
)
router.get('/:id', [authUsre, role(['root', 'currencies']), hasModule(['currencies'])], getById)
router.post('/', [authUsre, role(['root', 'currencies']), hasModule(['currencies'])], create)
router.put('/:id', [authUsre, role(['root', 'currencies']), hasModule(['currencies'])], update)
router.delete('/:id', [authUsre, role(['root', 'currencies']), hasModule(['currencies'])], remove)

module.exports = router
