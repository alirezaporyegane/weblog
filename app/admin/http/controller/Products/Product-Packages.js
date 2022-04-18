const _ = require('lodash'),
  mongoose = require('mongoose'),
  Product = require('../../../models/Prodcuts/Product'),
  ProductModel = require('../../../models/Prodcuts/Product-Models'),
  ProductArticles = require('../../../models/Prodcuts/Product-Articles'),
  ProductPackage = require('../../../models/Prodcuts/Product-Packages'),
  { errorMessages } = require('../../../../middleware/errorMessages'),
  { productPackagesValidator } = require('../../validator/Products/ProductPackages.validator')

class SalePlans {
  async getAllPackage(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      const articles = await ProductArticles.findById({ _id: id }).select(
        'packages._id packages.name packages.unitsQuantity packages.minOq packages.maxOq packages.default packages.sortOrder'
      )
      if (!articles) return res.status(200).json(null)

      res.status(200).json(articles.packages)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: errorMessages.error500,
        code: 500
      })
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      const result = await ProductPackage.findById(id)

      res
        .status(200)
        .json(
          _.pick(result, ['_id', 'name', 'unitsQuantity', 'minOq', 'maxOq', 'default', 'sortOrder'])
        )
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: errorMessages.error500,
        code: 500
      })
    }
  }

  async createPackage(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      req.body.productArticleId = id

      const { error } = productPackagesValidator(req.body)
      if (error)
        return res.status(400).json({
          data: error,
          msg: errorMessages.error400,
          code: 400
        })
      const packages = await ProductPackage.create(req.body)

      const productArticle = await ProductArticles.findById(id)
      productArticle.packages.push(packages)
      await productArticle.save()

      const productModel = await ProductModel.findById(productArticle.productModelId)
      const article = productModel.articles.id(id)
      article.packages.push(packages)
      await productModel.save()

      const product = await Product.findById(productModel.productsId)
      const models = product.models.id(productArticle.productModelId)
      const articleSalePlan = models.articles.id(id)
      articleSalePlan.packages.push(packages)
      await product.save()

      res
        .status(200)
        .json(
          _.pick(packages, [
            '_id',
            'name',
            'unitsQuantity',
            'minOq',
            'maxOq',
            'default',
            'sortOrder'
          ])
        )
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: errorMessages.error500,
        code: 500
      })
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      const packages = await ProductPackage.findById(id)
      const article = await ProductArticles.findById(packages.productArticleId)
      const model = await ProductModel.findById(article.productModelId)
      const product = await Product.findById(model.productsId)

      const productModel = product.models.id(article.productModelId)
      const productArticle = productModel.articles.id(packages.productArticleId)
      const productPackage = productArticle.packages.id(id)
      productPackage.set(req.body)
      await product.save()

      const modelArticle = model.articles.id(packages.productArticleId)
      const modelPackage = modelArticle.packages.id(id)
      modelPackage.set(req.body)
      await model.save()

      const articlePackages = article.packages.id(id)
      articlePackages.set(req.body)
      await article.save()

      const result = await ProductPackage.findByIdAndUpdate(id, req.body, { new: true })

      res
        .status(200)
        .json(
          _.pick(result, ['_id', 'name', 'unitsQuantity', 'minOq', 'maxOq', 'default', 'sortOrder'])
        )
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: errorMessages.error500,
        code: 500
      })
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      const packages = await ProductPackage.findById(id)
      const article = await ProductArticles.findById(packages.productArticleId)
      const model = await ProductModel.findById(article.productModelId)
      const product = await Product.findById(model.productsId)

      const productModel = product.models.id(article.productModelId)
      const productArticle = productModel.articles.id(packages.productArticleId)
      productArticle.packages.remove(id)
      await product.save()

      const modelArticle = model.articles.id(packages.productArticleId)
      modelArticle.packages.remove(id)
      await model.save()

      article.packages.remove(id)
      await article.save()

      await ProductPackage.remove({ _id: id })

      res.status(200).json('success')
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: errorMessages.error500,
        code: 500
      })
    }
  }
}

module.exports = new SalePlans()
