const mongoose = require('mongoose'),
_ = require('lodash'),
ProductRelationTypesModel = require('../../models/productRelationTypes'),
{ validatoProductRelationTypes } = require('../validator/ProductRelationTypes');

class Inventories {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? req.require.sort : ''

    ProductRelationTypesModel.find()
      .skip(skip)
      .limit(limit)
      .select('_id primarySideName relatedSideName sortOrder')
      .sort(Sort)
      .select(include)
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json({
            error: err,
            code: 500
          })
        })
  }

  async getCount (req, res) {
    ProductRelationTypesModel.find()
    .countDocuments()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async getById (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Product Relation Types Not Found',
      code: 400
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

      ProductRelationTypesModel.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'primarySideName', 'relatedSideName', 'sortOrder']))
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  
  async create (req, res) {
    const { error } = validatoProductRelationTypes(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      code: 400
    })
  
    const productRelationTypesModel = new ProductRelationTypesModel(_.pick(req.body, 
      ['primarySideName', 'relatedSideName', 'sortOrder'])
    )
  
    productRelationTypesModel.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          ['_id' , 'primarySideName', 'relatedSideName', 'sortOrder']))
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async update (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Product Relation Types Not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
    const {error} = validatoProductRelationTypes(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
    
    ProductRelationTypesModel.findByIdAndUpdate({ _id: id }, _.pick(req.body, 
      ['primarySideName', 'relatedSideName', 'sortOrder']))
      .then(result => {
        res.status(200).json(_.pick(result, ['_id' , 'primarySideName', 'relatedSideName', 'sortOrder']))
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async remove (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Product Relation Types Not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
      ProductRelationTypesModel.remove({ _id: id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }
}

module.exports = new Inventories()