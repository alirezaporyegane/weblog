const { Router } = require('express'),
  router = Router(),
  { getAll, getCount, getById, create, update, remove } = require('../http/controller/Banks'),
  { hasModule } = require('../http/middleware/modules'),
  { authUsre, role } = require('../http/middleware/check-auth')

router.get('/', [authUsre, role(['root', 'bank']), hasModule(['pay_bankReceipt'])], getAll)
router.get('/count', [authUsre, role(['root', 'bank']), hasModule(['pay_bankReceipt'])], getCount)
router.get('/:id', [authUsre, role(['root', 'bank'])], hasModule(['pay_bankReceipt']), getById)
router.post('/', [authUsre, role(['root', 'bank'])], hasModule(['pay_bankReceipt']), create)
router.put('/:id', [authUsre, role(['root', 'bank'])], hasModule(['pay_bankReceipt']), update)
router.delete('/:id', [authUsre, role(['root', 'bank'])], hasModule(['pay_bankReceipt']), remove)

module.exports = router
