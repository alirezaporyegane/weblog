const mongoose = require('mongoose'),
  _ = require('lodash'),
  ProductsGroupModel = require('../../../models/Prodcuts/Products-Groups'),
  ProductCategoriesModel = require('../../../models/Prodcuts/Products-Categories'),
  { validatoProductGroup } = require('../../validator/Products/Products-Groups')

class ProductsGroup {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    const filter = {}
    if (req.query.name) filter.name = { $regex: req.query.name }
    if (req.query.slug) filter.slug = { $regex: req.query.slug }

    try {
      const result = await ProductsGroupModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select(
          '_id name color slug sortOrder image description metaTitle metaDescription sortOrder'
        )
        .select(include)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getCount(req, res) {
    const filter = {}
    if (req.query.name) filter.name = { $regex: req.query.name }
    if (req.query.slug) filter.slug = { $regex: req.query.slug }

    try {
      const result = await ProductsGroupModel.find(filter).countDocuments()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getInfo(req, res) {
    try {
      const filter = []
      if (typeof req.query.keyword === 'object') {
        const ids = req.query.keyword.map((id) => mongoose.Types.ObjectId(id))
        filter.push({ $match: { _id: { $in: ids } } })
      } else if (req.query.keyword && mongoose.isValidObjectId(req.query.keyword)) {
        filter.push({ $match: { _id: mongoose.Types.ObjectId(req.query.keyword) } })
      } else if (req.query.keyword) {
        filter.push({ $match: { name: { $regex: req.query.keyword } } })
      }

      if (req.query.skip) filter.push({ $skip: parseInt(req.query.skip) })
      if (req.query.limit) filter.push({ $limit: parseInt(req.query.limit) })

      const result = await ProductsGroupModel.aggregate([
        {
          $project: {
            _id: 0,
            text: '$name',
            value: '$_id'
          }
        }
      ])

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getById(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).josn({
        msg: 'Bad Requset',
        code: 400
      })

    try {
      const result = await ProductsGroupModel.findById(id)

      res
        .status(200)
        .json(
          _.pick(result, [
            '_id',
            'name',
            'slug',
            'color',
            'image',
            'metaTitle',
            'metaDescription',
            'description'
          ])
        )
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async create(req, res) {
    const { error } = validatoProductGroup(req.body)
    console.log(error)
    if (error)
      return res.status(400).json({
        error: error,
        msg: 'Bad Request',
        code: 400
      })

    try {
      const result = await ProductsGroupModel.create(req.body)

      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err,
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

    const { error } = validatoProductGroup(req.body)
    console.log(error)
    if (error)
      return res.status(400).json({
        error: error,
        msg: 'Bad Request',
        code: 400
      })

    try {
      const result = await ProductsGroupModel.findByIdAndUpdate({ _id: id }, req.body, {
        new: true
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const ProductsGroup = await ProductsGroupModel.findById(id)

      ProductsGroup.categories.forEach(async (item) => {
        await ProductCategoriesModel.remove({ _id: item._id })
      })

      await ProductsGroupModel.remove({ _id: id })
      res.status(200).json('success')
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new ProductsGroup()
