const express = require('express'),
  router = express.Router(),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules'),
  { getAll, getInfo, upsert, create, update, remove } = require('../../http/controller/Post/Post-Categories')

router.get('/', [authUsre, role(['root', 'posts']), hasModule(['posts'])], getAll)
router.get('/info', [authUsre, role(['root', 'posts']), hasModule(['posts'])], getInfo)
router.patch('/', [authUsre, role(['root', 'posts']), hasModule(['posts'])], upsert)
router.post('/', [authUsre, role(['root', 'posts']), hasModule(['posts'])], create)
router.put('/:id', [authUsre, role(['root', 'posts']), hasModule(['posts'])], update)
router.delete('/:id', [authUsre, role(['root', 'posts']), hasModule(['posts'])], remove)

module.exports = router
