const mongoose = require('mongoose'),
  _ = require('lodash'),
  ProductCategoriesModel = require('../../../models/Prodcuts/Products-Categories'),
  ProductGroupModel = require('../../../models/Prodcuts/Products-Groups'),
  ProdcutModel = require('../../../models/Prodcuts/Product'),
  { validateProductsCategories } = require('../../validator/Products/Product-Categories')

class ProductCategories {
  async getAllCategory(req, res) {
    try {
      const id = req.params.id

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const productGroup = await ProductGroupModel.findById(id).populate('categories.typeId')
      if (!productGroup) return res.status(200).json(null)

      res.status(200).json(productGroup.categories)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async createCategory(req, res) {
    try {
      const id = req.params.id

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const productGroup = await ProductGroupModel.findById(id)
      if (!productGroup) return res.status(200).json(null)
      req.body.groupId = id
      const group = {
        _id: `${productGroup._id}`,
        name: productGroup.name,
        slug: productGroup.slug
      }
      req.body.group = group
      const hasSameSlug = await ProductCategoriesModel.find({ slug: req.body.slug })
      if (hasSameSlug && hasSameSlug.length)
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const { error } = validateProductsCategories(req.body)
      if (error)
        return res.status(400).json({
          data: error,
          msg: 'Bad Request',
          code: 400
        })

      const result = await ProductCategoriesModel.create(req.body)
      productGroup.categories.push(result)
      await productGroup.save()

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

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const { error } = validateProductsCategories(req.body)
      if (error)
        return res.status(400).json({
          data: error,
          msg: 'Bad Request',
          code: 400
        })

      const categories = await ProductCategoriesModel.findByIdAndUpdate(id, req.body, { new: true })

      const groups = await ProductGroupModel.findById(categories.groupId)
      const groupCategories = groups.categories.id(id)

      groupCategories.name = req.body.name
      groupCategories.slug = req.body.slug
      groupCategories.image = req.body.image
      groupCategories.sortOrder = req.body.sortOrder
      groupCategories.metaTitle = req.body.metaTitle
      groupCategories.description = req.body.description
      groupCategories.metaDescription = req.body.metaDescription
      groupCategories.metaDescription = req.body.metaDescription
      groupCategories.parentId = req.body.parentId
      groupCategories.altName = req.body.altName
      groupCategories.tags = req.body.tags
      groupCategories.otherNames = req.body.otherNames
      groupCategories.typeId = req.body.typeId
      groupCategories.typeId = req.body.typeId
      groupCategories.active = req.body.active

      await groups.save()

      res.status(200).json(categories)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getInfo(req, res) {}

  async getById(req, res) {
    try {
      const id = req.params.id

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const result = await ProductCategoriesModel.findById(id)

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
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const products = await ProdcutModel.find({ categoriesId: id })
      if (products && products.length)
        return res.status(417).json({
          msg: 'Expectation Failed',
          code: 417
        })

      const categories = await ProductCategoriesModel.findById(id)
      const groups = await ProductGroupModel.findById(categories.groupId)
      groups.categories.remove(id)

      await groups.save()
      await ProductCategoriesModel.remove({ _id: id })

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

module.exports = new ProductCategories()
