const express = require('express'),
  router = express.Router(),
  { authUsre, role } = require('../../http/middleware/check-auth'),
  { hasModule } = require('../../http/middleware/modules'),
  {
    getAll,
    getCount,
    getById,
    create,
    update,
    remove
  } = require('../../http/controller/Post/Posts')

router.get('/', [authUsre, role(['root', 'posts']), hasModule(['posts'])], getAll)
router.get('/count', [authUsre, role(['root', 'posts']), hasModule(['posts'])], getCount)
router.get('/:id', [authUsre, role(['root', 'posts']), hasModule(['posts'])], getById)
router.post('/', [authUsre, role(['root', 'posts']), hasModule(['posts'])], create)
router.put('/:id', [authUsre, role(['root', 'posts']), hasModule(['posts'])], update)
router.delete('/:id', [authUsre, role(['root', 'posts']), hasModule(['posts'])], remove)

module.exports = router
