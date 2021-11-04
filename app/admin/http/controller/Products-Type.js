const mongoose = require('mongoose'),
_ = require('lodash'),
ProductSetType = require('../../models/products-type'),
{ ValidateProductSetType, ValidateColor } = require('../validator/products-type');

class ProductsType {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? req.query.sort : ''
    const title = req.query.title ? req.query.title : ''

    ProductSetType.find(
      {title: { $regex: title }}
    )
      .populate('typeId')
      .populate('unit')
      .skip(skip)
      .limit(limit)
      .sort(Sort)
      .select('-typeId -unit -color -size -guarantee -fieldTypeGroups -tab1 -tab2 -tab3 -tab4 -tab5 -tab6 -r1 -r2 -r3 -r4 -r5 -r6')
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
    const title = req.query.title ? req.query.title : ''

    ProductSetType.find(
      { title: { $regex: title } }
    )
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

      ProductSetType.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id' ,'title', 'slug', 'sortOrder', 'active', 'typeId', 'unit', 'color', 'size', 'guarantee', 'fieldTypeGroups', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 
        'tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }

  async create (req, res) {
    const { error } = ValidateProductSetType(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
  
    const productSetType = new ProductSetType({..._.pick(req.body, 
      ['_id' ,'title', 'slug', 'sortOrder', 'active', 'typeId', 'unit', 'color', 'size', 'guarantee', 'fieldTypeGroups', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 
        'tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'])
    })
  
    productSetType.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          ['_id' ,'title', 'slug', 'sortOrder', 'active', 'typeId', 'unit', 'color', 'size', 'guarantee', 'fieldTypeGroups', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 
          'tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'productSetType Not Post',
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
  
    const {error} = ValidateProductSetType(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
    
    ProductSetType.findByIdAndUpdate({ _id: id }, _.pick(req.body, 
      ['_id' ,'title', 'slug', 'sortOrder', 'active', 'typeId', 'unit', 'color', 'size', 'guarantee', 'fieldTypeGroups', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 
          'tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6']))
      .then(result => {
        res.status(200).json(_.pick(result, ['_id' ,'title', 'slug', 'sortOrder', 'active', 'typeId', 'unit', 'color', 'size', 'guarantee', 'fieldTypeGroups', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 
        'tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }

  async remove (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'productSetType not Found',
      success: false
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })
  
    ProductSetType.remove({ _id: id })
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

