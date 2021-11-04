const express = require('express'),
router = express.Router(),
{ authUsre, admin } = require('../http/middleware/check-auth'),
PostController = require('../http/controller/Posts');

router.get('/', [authUsre, admin], PostController.getAll)
router.get('/count', [authUsre, admin], PostController.getCount)
router.get('/:id', [authUsre, admin], PostController.getById)
router.post('/', [authUsre, admin], PostController.create)
router.put('/:id', [authUsre, admin], PostController.update)
router.delete('/:id', [authUsre, admin], PostController.remove)

module.exports = router