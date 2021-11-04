const mongoose = require('mongoose'),
_ = require('lodash'),
PostController = require('../../models/posts'),
{ postValidator } = require('../validator/Posts');

class Post {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''

    PostController.find()
      .skip(skip)
      .limit(limit)
      .select(['_id', 'title', 'slug', 'image','header', 'excerpt', 'lead', 'body', 'metaTitle', 'metaDescription', 'featured', 'primaryCategoryId', 'categoryIds', 'published'])
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
    PostController.find()
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
      msg: 'Post not Found',
      success: false
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })

      PostController.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'title', 'slug', 'image','header', 'excerpt', 'lead', 'body', 'metaTitle', 'metaDescription', 'featured', 'primaryCategoryId', 'categoryIds', 'published']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }

  async create (req, res) {
    const { error } = postValidator(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })
  
    const postController = new PostController({..._.pick(req.body, 
      ['title', 'slug', 'image','header', 'excerpt', 'lead', 'body', 'metaTitle', 'metaDescription', 'featured', 'primaryCategoryId', 'categoryIds', 'published'])
    })
  
    postController.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          ['_id', 'title', 'slug', 'image','header', 'excerpt', 'lead', 'body', 'metaTitle', 'metaDescription', 'featured', 'primaryCategoryId', 'categoryIds', 'published']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'Post Not Post',
          error: err,
          success: false
        })
      })
  }

  async update (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Post not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
    const {error} = postValidator(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })
    
    PostController.findByIdAndUpdate({ _id: id }, _.pick(req.body, 
      ['title', 'slug', 'image','header', 'excerpt', 'lead', 'body', 'metaTitle', 'metaDescription', 'featured', 'primaryCategoryId', 'categoryIds', 'published']))
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'title', 'slug', 'image','header', 'excerpt', 'lead', 'body', 'metaTitle  ', 'metaDescription', 'featured', 'primaryCategoryId', 'categoryIds', 'published']))
      })
      .catch(err => {
        res.status(500).json({
          code: 500,
          error: err
        })
      })
  }

  async remove (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Post not Found',
      success: false
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })
  
      PostController.remove({ _id: id })
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

module.exports = new Post()

