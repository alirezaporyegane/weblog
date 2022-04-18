const express = require('express')
const router = express.Router()
const { getAllBySearch, getById, createCompareProduct } = require('../Controllers/Products')

router.post('/search', getAllBySearch)
router.post('/compare', createCompareProduct)
router.get('/:id', getById)

module.exports = router
