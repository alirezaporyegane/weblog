const mongoose = require('mongoose'),
_ = require('lodash'),
ProductsUnitController = require('../../models/products-unit'),
{ ValidateUnit } = require('../validator/products-unit');

class ProductsType {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''

    ProductsUnitController.find()
      .skip(skip)
      .limit(limit)
      .select('_id name sortOrder precision active')
      .select(include)
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({
            msg: 'Get has Failed',
            error: err
          })
        })
  }

  async getCount (req, res) {
    ProductsUnitController.find()
    .countDocuments()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'Get has Failed',
          error: err
        })
      })
  }

  async getById (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'User not Found',
      success: false
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })

      ProductsUnitController.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'precision', 'active']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }

  async create (req, res) {
    const { error } = ValidateUnit(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
  
    const productsUnitController = new ProductsUnitController({..._.pick(req.body, 
      ['name', 'sortOrder', 'precision', 'active'])
    })
  
    productsUnitController.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          ['_id' ,'name', 'sortOrder', 'precision', 'active']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'ProductsUnit Not Post',
          error: err,
          success: false
        })
      })
  }

  async update (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'User not Found',
      success: false
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })
  
    const {error} = ValidateUnit(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
    
    ProductsUnitController.findByIdAndUpdate({ _id: id }, _.pick(req.body, 
      ['name', 'sortOrder', 'precision', 'active']))
      .then(result => {
        res.status(200).json(_.pick(result, ['_id' ,'name', 'sortOrder', 'precision', 'active']))
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async remove (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'ProductsUnit not Found',
      success: false
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })
  
    ProductsUnitController.remove({ _id: id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }
}

module.exports = new ProductsType()

