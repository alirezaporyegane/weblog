const mongoose = require('mongoose'),
  _ = require('lodash'),
  PostController = require('../../../models/Post/Posts'),
  { postValidator } = require('../../validator/Post/Posts')

class Post {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''

    PostController.find()
      .populate('primaryCategoryId')
      .skip(skip)
      .limit(limit)
      .select([
        '_id',
        'title',
        'slug',
        'image',
        'header',
        'excerpt',
        'lead',
        'body',
        'metaTitle',
        'metaDescription',
        'featured',
        'primaryCategoryId',
        'published'
      ])
      .select(include)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          msg: 'Get has Failed',
          error: err
        })
      })
  }

  async getCount(req, res) {
    PostController.find()
      .countDocuments()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          msg: 'Get has Failed',
          error: err
        })
      })
  }

  async getById(req, res) {
    const id = req.params.id

    if (!id)
      return res.status(400).json({
        msg: 'Post not Found',
        success: false
      })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })

    PostController.findById(id)
      .then((result) => {
        res
          .status(200)
          .json(
            _.pick(result, [
              '_id',
              'title',
              'slug',
              'image',
              'header',
              'excerpt',
              'lead',
              'body',
              'metaTitle',
              'metaDescription',
              'featured',
              'primaryCategoryId',
              'published'
            ])
          )
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }

  async create(req, res) {
    try {
      const result = await PostController.create(req.body)

      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async update(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    PostController.findByIdAndUpdate(
      { _id: id },
      _.pick(req.body, [
        'title',
        'slug',
        'image',
        'header',
        'excerpt',
        'lead',
        'body',
        'metaTitle',
        'metaDescription',
        'featured',
        'primaryCategoryId',
        'published'
      ])
    )
      .then((result) => {
        res
          .status(200)
          .json(
            _.pick(result, [
              '_id',
              'title',
              'slug',
              'image',
              'header',
              'excerpt',
              'lead',
              'body',
              'metaTitle  ',
              'metaDescription',
              'featured',
              'primaryCategoryId',
              'published'
            ])
          )
      })
      .catch((err) => {
        res.status(500).json({
          code: 500,
          error: err
        })
      })
  }

  async remove(req, res) {
    const id = req.params.id

    if (!id)
      return res.status(400).json({
        msg: 'Post not Found',
        success: false
      })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })

    PostController.remove({ _id: id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }
}

module.exports = new Post()
