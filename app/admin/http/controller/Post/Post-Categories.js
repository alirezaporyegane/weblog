const PostCategoriesModel = require('../../../models/Post/Post-Categories'),
  PostModel = require('../../../models/Post/Posts'),
  _ = require('lodash')

class PostCategories {
  async getAll(req, res) {
    PostCategoriesModel.find()
      .sort({ sortOrder: 1 })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          data: err,
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async create(req, res) {
    try {
      const createAble = req.body.filter((item) => item._id < 0)
      let result = []

      createAble.forEach(async (item) => {
        delete item._id
        result = await PostCategoriesModel.create(item)
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      const result = await PostCategoriesModel.findByIdAndUpdate(id, req.body, { new: true })

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id

      const post = await PostModel.find({ primaryCategoryId: id })
      const postCategory = await PostCategoriesModel.find({ parentId: id })

      if (post.length >= 1)
        return res.status(417).json({
          msg: 'Expectation Failed',
          code: 417
        })

      if (postCategory.length >= 1)
        return res.status(412).json({
          msg: 'Precondition Failed',
          code: 412
        })

      await PostCategoriesModel.findByIdAndDelete({ _id: id })

      res.status(200).json('success')
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async upsert(req, res) {
    try {
      const categories = await PostCategoriesModel.find()

      const createAble = req.body.filter((item) => item._id < 0)
      const removAble = await PostCategoriesModel.find({
        _id: { $ne: req.body.filter((o) => o._id > 0).map((i) => i._id) || [] }
      })
      const updateAble = await PostCategoriesModel.find({
        _id: { $eq: req.body.filter((o) => o._id > 0).map((i) => i._id) || [] }
      })

      console.log('createAble:', createAble, 'removAble', removAble, 'updateAble', updateAble)

      const post = await PostModel.find()

      const canNotDeletePostCategory = post.filter((item) =>
        removAble.find((i) => item.primaryCategoryId == i._id)
      )

      if (canNotDeletePostCategory && canNotDeletePostCategory.length > 1)
        return res.status(417).json({
          msg: 'Expectation Failed',
          code: 417
        })

      removAble.forEach(async (item) => {
        await PostCategoriesModel.findByIdAndDelete({ _id: item._id })
      })

      createAble.forEach(async (item) => {
        delete item._id
        await PostCategoriesModel.create(item)
      })

      updateAble.forEach(async (item) => {
        await PostCategoriesModel.findByIdAndUpdate(item._id, item)
      })

      res.status(200).json('success')
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new PostCategories()
