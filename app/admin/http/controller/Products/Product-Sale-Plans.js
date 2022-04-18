const _ = require('lodash'),
  mongoose = require('mongoose'),
  Product = require('../../../models/Prodcuts/Product'),
  ProductModel = require('../../../models/Prodcuts/Product-Models'),
  ProductArticles = require('../../../models/Prodcuts/Product-Articles'),
  ProductSalePlans = require('../../../models/Prodcuts/Product-Sale-Plans'),
  { errorMessages } = require('../../../../middleware/errorMessages'),
  { validationSalePlans } = require('../../validator/Products/ProductSalePlans.validator')

class SalePlans {
  async getAllSalePlans(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      const articles = await ProductArticles.findById(id).select(
        'salePlans._id salePlans.from salePlans.discountPercent salePlans.priceBeforeDiscount salePlans.priceAfterDiscount salePlans.discount'
      )
      if (!articles) return res.status(200).json(null)

      res.status(200).json(articles.salePlans)
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

      const result = await ProductSalePlans.findById(id)

      res
        .status(200)
        .json(
          _.pick(result, [
            '_id',
            'from',
            'discountPercent',
            'priceBeforeDiscount',
            'priceAfterDiscount',
            'discount'
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

  async createSalePlans(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      if (req.body.discountPercent && req.body.priceBeforeDiscount) {
        req.body.priceAfterDiscount =
          (req.body.priceBeforeDiscount * (100 - req.body.discountPercent)) / 100

        req.body.discount = req.body.priceBeforeDiscount - req.body.priceAfterDiscount
      }
      req.body.productArticleId = id

      const { error } = validationSalePlans(req.body)
      if (error)
        return res.status(400).json({
          data: error,
          msg: errorMessages.error400,
          code: 400
        })

      const salePlans = await ProductSalePlans.create(req.body)

      const productArticle = await ProductArticles.findById(id)
      productArticle.salePlans.push(salePlans)
      await productArticle.save()

      const productModel = await ProductModel.findById(productArticle.productModelId)
      const article = productModel.articles.id(id)
      article.salePlans.push(salePlans)
      await productModel.save()

      const product = await Product.findById(productModel.productsId)
      const models = product.models.id(productArticle.productModelId)
      const articleSalePlan = models.articles.id(id)
      articleSalePlan.salePlans.push(salePlans)
      await product.save()

      res
        .status(200)
        .json(
          _.pick(salePlans, [
            '_id',
            'from',
            'discountPercent',
            'priceBeforeDiscount',
            'priceAfterDiscount',
            'discount'
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

      const salePlans = await ProductSalePlans.findById(id)
      const article = await ProductArticles.findById(salePlans.productArticleId)
      const model = await ProductModel.findById(article.productModelId)
      const product = await Product.findById(model.productsId)

      if (req.body.discountPercent && req.body.priceBeforeDiscount) {
        req.body.priceAfterDiscount =
          (req.body.priceBeforeDiscount * (100 - req.body.discountPercent)) / 100

        req.body.discount = req.body.priceBeforeDiscount - req.body.priceAfterDiscount
      }
      const { error } = validationSalePlans(req.body)
      if (error)
        return res.status(400).json({
          data: error,
          msg: errorMessages.error400,
          code: 400
        })

      const productModel = product.models.id(article.productModelId)
      const productArticle = productModel.articles.id(salePlans.productArticleId)
      const productSalePlan = productArticle.salePlans.id(id)
      productSalePlan.set(req.body)
      await product.save()

      const modelArticle = model.articles.id(salePlans.productArticleId)
      const modelSalePlans = modelArticle.salePlans.id(id)
      modelSalePlans.set(req.body)
      await model.save()

      const articleSalePlane = article.salePlans.id(id)
      articleSalePlane.set(req.body)
      await article.save()

      const result = await ProductSalePlans.findByIdAndUpdate(id, req.body, { new: true })

      res
        .status(200)
        .json(
          _.pick(result, [
            'from',
            'discountPercent',
            'priceBeforeDiscount',
            'priceAfterDiscount',
            'discount'
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

  async remove(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      const salePlans = await ProductSalePlans.findById(id)
      const article = await ProductArticles.findById(salePlans.productArticleId)
      const model = await ProductModel.findById(article.productModelId)
      const product = await Product.findById(model.productsId)

      const productModel = product.models.id(article.productModelId)
      const productArticle = productModel.articles.id(salePlans.productArticleId)
      productArticle.salePlans.remove(id)
      await product.save()

      const modelArticle = model.articles.id(salePlans.productArticleId)
      modelArticle.salePlans.remove(id)
      await model.save()

      article.salePlans.remove(id)
      await article.save()

      await ProductSalePlans.remove({ _id: id })

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
