const express = require('express'),
router = express.Router(),
bankAccountsController = require('../http/controller/Bank-Accounts'),
{ authUsre, admin } = require('../http/middleware/check-auth')

router.get('/',[authUsre, admin], bankAccountsController.getAll)
router.get('/count',[authUsre, admin], bankAccountsController.getCount)
router.get('/:id',[authUsre, admin], bankAccountsController.getById)
router.post('/',[authUsre, admin], bankAccountsController.create)
router.put('/:id',[authUsre, admin], bankAccountsController.update)
router.delete('/:id',[authUsre, admin], bankAccountsController.remove)

module.exports = router