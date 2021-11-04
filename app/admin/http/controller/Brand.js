const mongoose = require('mongoose'),
_ = require('lodash');

const Brand = require('../../models/brand');
const {
  brandValidator
} = require('../validator/Brand')

class brand {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? req.query.sort : ''
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''
    
    Brand.find(
      {slug: { $regex: slug }, title: { $regex: name }}
    )
    .populate('typeId')
    .skip(skip)
    .limit(limit)
    .sort(Sort)
    .select('_id title slug arrangement image otherName')
    .select(include)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          code: 500,
          error: err
        })
      })
  }

  async getCount (req, res) {
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''

    Brand.find(
      {slug: { $regex: slug }, title: { $regex: name }}
    )
    .countDocuments()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          code: 500,
          error: err
        })
      })
  }

  async getById (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'User not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        success: false,
        code: 400
      })
  
    Brand.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'title', 'slug', 'arrangement', 'typeId', 'image', 'otherName', 'body']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async create (req, res) {
    const error = brandValidator(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      code: 400
    })
  
    const brand = new Brand(_.pick(req.body, 
      ['title','altName' ,'slug', 'arrangement', 'tags', 'mataTitle', 'metaDescription', 'typeId', 'image', 'otherName', 'body']))
  
    brand.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          ['_id' ,'title', 'slug', 'arrangement']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err,
          code: 500
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
  
    const error = brandValidator(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
    
    Brand.findByIdAndUpdate({ _id: id }, _.pick(req.body, 
      ['title','altName' ,'slug', 'arrangement', 'tags', 'mataTitle', 'metaDescription', 'typeId', 'image', 'otherName', 'body']))
      .then(result => {
        console.log(result)
        res.status(200).json(_.pick(result, ['_id' ,'title', 'slug', 'arrangement']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          code: 500,
          error: err
        })
      }, {new: true})
  }

  async delete (req, res) {
    const id = req.params.brandId

    if (!id) return res.status(400).json({
      msg: 'User not Found',
      code: 400,
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
    Brand.remove({ _id: id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }
}

module.exports = new brand()

