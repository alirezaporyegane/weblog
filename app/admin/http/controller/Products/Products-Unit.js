const mongoose = require('mongoose'),
  _ = require('lodash'),
  ProductsUnitController = require('../../../models/Prodcuts/Products-Unit'),
  { ValidateUnit } = require('../../validator/Products/Products-Unit')

class ProductsType {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    const filter = {}
    if (req.query.name) filter.name = { $regex: req.query.name }
    if (req.query.active) filter.active = req.query.active

    ProductsUnitController.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(Sort)
      .select('_id name sortOrder precision active')
      .select(include)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async getInfo(req, res) {
    try {
      const filter = []
      if (typeof req.query.keyword === 'object') {
        const ids = req.query.keyword.map((id) => mongoose.Types.ObjectId(id))
        filter.push({ $match: { _id: { $in: ids } } })
      } else if (req.query.keyword && mongoose.isValidObjectId(req.query.keyword)) {
        filter.push({ $match: { _id: mongoose.Types.ObjectId(req.query.keyword) } })
      } else if (req.query.keyword) {
        filter.push({ $match: { name: { $regex: req.query.keyword } } })
      }

      if (req.query.limit) filter.push({ $limit: parseInt(req.query.limit) })
      if (req.query.skip) filter.push({ $skip: parseInt(req.query.skip) })

      const items = await ProductsUnitController.aggregate([
        { $sort: { title: 1 } },
        ...filter,
        {
          $project: {
            _id: 0,
            text: '$name',
            value: '$_id'
          }
        }
      ])

      const count = await ProductsUnitController.find().countDocuments()

      res.status(200).json({ items, count })
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        data: err,
        code: 500
      })
    }
  }

  async getCount(req, res) {
    const filter = {}
    if (req.query.name) filter.name = { $regex: req.query.name }
    if (req.query.active) filter.active = req.query.active

    ProductsUnitController.find(filter)
      .countDocuments()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async getById(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    ProductsUnitController.findById(id)
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'precision', 'active']))
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async create(req, res) {
    const { error } = ValidateUnit(req.body)
    if (error)
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const productsUnitController = new ProductsUnitController({
      ..._.pick(req.body, ['name', 'sortOrder', 'precision', 'active'])
    })

    productsUnitController
      .save()
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'precision', 'active']))
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async update(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const { error } = ValidateUnit(req.body)
    if (error)
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    ProductsUnitController.findByIdAndUpdate(
      { _id: id },
      _.pick(req.body, ['name', 'sortOrder', 'precision', 'active'])
    )
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'precision', 'active']))
      })
      .catch((err) => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async remove(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    ProductsUnitController.remove({ _id: id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }
}

module.exports = new ProductsType()
