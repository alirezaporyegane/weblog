const mongoose = require('mongoose'),
_ = require('lodash'),
PostCategoriesModel = require('../../models/postCategories'),
{ postCategoriesValidator } = require('../validator/PostCategories');

class PostCategories {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const populate = req.query.populate ? req.query.populate : false

    if (populate) {
      PostCategoriesModel.find()
      .skip(skip)
      .limit(limit)
      .populate('parentId')
      .select(['name', 'slug', 'metaTitle', 'metaDescription', 'sortOrder'])
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
    else {
      PostCategoriesModel.find()
      .skip(skip)
      .limit(limit)
      .select(['name', 'slug', 'metaTitle', 'metaDescription', 'sortOrder', 'parentId'])
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
  }

  async getCount (req, res) {
    PostCategoriesModel.find()
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
      msg: 'PostCategories not Found',
      success: false
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })

      PostCategoriesModel.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['name', 'slug', 'metaTitle', 'metaDescription', 'sortOrder', 'parentId']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }

  async create (req, res) {
    const { error } = postCategoriesValidator(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
  
    const postCategoriesModel = new PostCategoriesModel(_.pick(req.body, 
      'name', 'slug', 'metaTitle', 'metaDescription', 'sortOrder', 'parentId'))
      postCategoriesModel.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          'name', 'slug', 'metaTitle', 'metaDescription', 'sortOrder', 'parentId'))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'PostCategories Not Post',
          error: err,
          code: 500
        })
      })
  }

  async update (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'PostCategories not Found',
      success: false
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })
  
    const {error} = postCategoriesValidator(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
    
    PostCategoriesModel.findByIdAndUpdate({ _id: id }, _.pick(req.body, 
      'name', 'slug', 'metaTitle', 'metaDescription', 'sortOrder', 'parentId'))
      .then(result => {
        res.status(200).json(_.pick(result, 'name', 'slug', 'metaTitle', 'metaDescription', 'sortOrder', 'parentId'))
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
      msg: 'PostCategories not Found',
      success: false
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })
  
      PostCategoriesModel.remove({ _id: id })
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

module.exports = new PostCategories()

