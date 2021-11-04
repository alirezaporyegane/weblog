const express = require('express'),
router = express.Router(),
bankController = require('../http/controller/Banks'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/',[authUsre, admin], bankController.getAll)
router.get('/count',[authUsre, admin], bankController.getCount)
router.get('/:id',[authUsre, admin], bankController.getById)
router.post('/',[authUsre, admin], bankController.create)
router.put('/:id',[authUsre, admin], bankController.update)
router.delete('/:id',[authUsre, admin], bankController.remove)

module.exports = router