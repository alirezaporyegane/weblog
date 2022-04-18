const express = require('express'),
  router = express.Router(),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  {
    getAll,
    getCount,
    getById,
    create,
    update,
    remove
  } = require('../../http/controller/Pages/Pages'),
  { hasModule } = require('../../http/middleware/modules')

router.get('/', [authUsre, role(['root', 'pages']), hasModule(['pages'])], getAll)
router.get('/count', [authUsre, role(['root', 'pages']), hasModule(['pages'])], getCount)
router.get('/:id', [authUsre, role(['root', 'pages']), hasModule(['pages'])], getById)
router.post('/', [authUsre, role(['root', 'pages']), hasModule(['pages'])], create)
router.put('/:id', [authUsre, role(['root', 'pages']), hasModule(['pages'])], update)
router.delete('/:id', [authUsre, role(['root', 'pages']), hasModule(['pages'])], remove)

module.exports = router
