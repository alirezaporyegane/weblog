const mongoose = require('mongoose'),
  _ = require('lodash'),
  ProductsGroupModel = require('../../../models/Prodcuts/Products-Groups'),
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
        code: 500,
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
        code: 500,
      })
    }
  }

  async getInfo(req, res) {
    try {
      const result = await ProductsGroupModel.aggregate([
        {
          $project: {
            _id: 0,
            text: '$name',
            value: '$_id',
          },
        },
      ])

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async getById(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).josn({
        msg: 'Bad Requset',
        code: 400,
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
            'description',
          ])
        )
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500,
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
        code: 400,
      })

    try {
      const result = await ProductsGroupModel.create(req.body)

      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async update(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    const { error } = validatoProductGroup(req.body)
    console.log(error)
    if (error)
      return res.status(400).json({
        error: error,
        msg: 'Bad Request',
        code: 400,
      })

    try {
      const result = await ProductsGroupModel.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async remove(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    try {
      await ProductsGroupModel.remove({ _id: id })

      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async getAllCategory(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    try {
      const productGroup = await ProductsGroupModel.findById(id).populate('categories.typeId')

      res.status(200).json(productGroup.categories)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async updateAllCategories(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    try {
      const productGroup = await ProductsGroupModel.findById(id)

      productGroup.categories.splice(0, productGroup.categories.length)

      productGroup.categories = req.body

      await productGroup.save()

      res.status(200).json(productGroup.categories)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async getByIdCategories(req, res) {
    const groupId = req.params.groupId
    const categoryId = req.params.categoryId

    if (!mongoose.isValidObjectId(groupId))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    try {
      const productGroup = await ProductsGroupModel.findById(groupId)

      const productCategory = await productGroup.categories.id(categoryId)

      res.status(200).json(productCategory)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async updateByIdCategories(req, res) {
    const groupId = req.params.groupId
    const categoryId = req.params.categoryId

    if (!mongoose.isValidObjectId(groupId))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    try {
      const productGroup = await ProductsGroupModel.findById(groupId)

      const productCategory = await productGroup.categories.id(categoryId)

      Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== null) {
          if (key !== 'parentId' && key !== 'sortOrder') {
            productCategory[key] = req.body[key]
          }
        } else {
          productCategory[key] = null
        }
      })

      await productGroup.save()

      res.status(200).json(productCategory)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }
}

module.exports = new ProductsGroup()
