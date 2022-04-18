const express = require('express'),
  router = express.Router(),
  {
    getAll,
    getInfo,
    getCount,
    getById,
    create,
    update,
    remove
  } = require('../http/controller/Bank-Accounts'),
  { hasModule } = require('../http/middleware/modules'),
  { authUsre, role } = require('../http/middleware/check-auth')

router.get('/', [authUsre, role(['root', 'bank-account']), hasModule(['pay_credit'])], getAll)
router.get('/info', [authUsre, role(['root', 'bank-account']), hasModule(['pay_credit'])], getInfo)
router.get(
  '/count',
  [authUsre, role(['root', 'bank-account']), hasModule(['pay_credit'])],
  getCount
)
router.get('/:id', [authUsre, role(['root', 'bank-account']), hasModule(['pay_credit'])], getById)
router.post('/', [authUsre, role(['root', 'bank-account']), hasModule(['pay_credit'])], create)
router.put('/:id', [authUsre, role(['root', 'bank-account']), hasModule(['pay_credit'])], update)
router.delete('/:id', [authUsre, role(['root', 'bank-account']), hasModule(['pay_credit'])], remove)

module.exports = router
