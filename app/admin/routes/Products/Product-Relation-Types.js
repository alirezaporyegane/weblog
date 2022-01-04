const express = require('express'),
router = express.Router(),
{ getAll, getInfo, getCount, getById, create, update, remove } = require('../../http/controller/Products/Product-Relation-Types'),
{ authUsre, admin } = require('../../http/middleware/check-auth'),
{ hasModule } = require('../../http/middleware/modules');

router.get('/',[authUsre, admin, hasModule(['products_relations'])], getAll)
router.get('/info', [authUsre, admin, hasModule(['products_relations'])], getInfo)
router.get('/count',[authUsre, admin, hasModule(['products_relations'])], getCount)
router.get('/:id',[authUsre, admin, hasModule(['products_relations'])], getById)
router.post('/',[authUsre, admin, hasModule(['products_relations'])], create)
router.put('/:id',[authUsre, admin, hasModule(['products_relations'])], update)
router.delete('/:id',[authUsre, admin, hasModule(['products_relations'])], remove)

module.exports = router