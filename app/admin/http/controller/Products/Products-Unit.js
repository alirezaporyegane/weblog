const mongoose = require('mongoose'),
_ = require('lodash'),
ProductsUnitController = require('../../../models/Prodcuts/Products-Unit'),
{ ValidateUnit } = require('../../validator/Products/Products-Unit');

class ProductsType {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const name = req.query.name ? req.query.name : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    ProductsUnitController.find(
      { name: { $regex: name } }
    )
      .skip(skip)
      .limit(limit)
      .sort(Sort)
      .select('_id name sortOrder precision active')
      .select(include)
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json({
            msg: 'Internal Server Error',
            code: 500
          })
        })
  }

  async getInfo (req, res) {
    ProductsUnitController.aggregate([
      {
        $project: {
          _id: 0,
          text: "$name",
          value: "_id"
        }
      }
    ])
      .then(result => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async getCount (req, res) {
    const name = req.query.name ? req.query.name : ''
    ProductsUnitController.find(
      {title: { $regex: name }}
    )
    .countDocuments()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async getById (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

      ProductsUnitController.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'precision', 'active']))
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async create (req, res) {
    const { error } = ValidateUnit(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    const productsUnitController = new ProductsUnitController({..._.pick(req.body,
      ['name', 'sortOrder', 'precision', 'active'])
    })

    productsUnitController.save()
      .then(result => {
        res.status(200).json(_.pick(result,
          ['_id' ,'name', 'sortOrder', 'precision', 'active']))
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async update (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const {error} = ValidateUnit(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    ProductsUnitController.findByIdAndUpdate({ _id: id }, _.pick(req.body,
      ['name', 'sortOrder', 'precision', 'active']))
      .then(result => {
        res.status(200).json(_.pick(result, ['_id' ,'name', 'sortOrder', 'precision', 'active']))
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async remove (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    ProductsUnitController.remove({ _id: id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }
}

module.exports = new ProductsType()

