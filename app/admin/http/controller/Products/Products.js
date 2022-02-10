const _ = require('lodash'),
  Product = require('../../../models/Prodcuts/Product'),
  { productValidate } = require('../../validator/Products/Product')

class products {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    Product.find()
      .populate('brand', ['_id', 'title', 'altTitle', 'image'])
      .populate('typeId', ['_id', 'title', 'altTitle'])
      .skip(skip)
      .limit(limit)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          msg: 'Get has Failed',
          error: err,
          success: false,
        })
      })
  }

  async getCount(req, res) {
    Product.find()
      .countDocuments()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          success: false,
        })
      })
  }

  async getById(req, res) {
    const id = req.params.productId
    Product.findById(id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        })
      })
  }

  async create(req, res) {
    const error = productValidate(req.body)
    if (error)
      return res.status(400).json({
        msg: error.message,
        success: false,
      })

    console.log(req.file)

    const product = new Product({
      ..._.pick(req.body, [
        'title',
        'altTitle',
        'brand',
        'typeId',
        'price',
        'image',
        'alert',
        'body',
        'header',
      ]),
    })
    product
      .save()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        })
      })
  }

  async update(req, res) {
    const id = req.params.id
    Product.findByIdAndUpdate(
      { _id: id },
      _.pick(req.body, [
        'title',
        'altTitle',
        'brand',
        'typeId',
        'price',
        'image',
        'alert',
        'body',
        'header',
      ])
    )
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        })
      })
  }

  async remove(req, res) {
    const id = req.params.id
    Product.remove({ _id: id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          error: err,
        })
      })
  }
}

module.exports = new products()
