const _ = require('lodash'),
  mongoose = require('mongoose'),
  ProductModel = require('../../../models/Prodcuts/Product'),
  Models = require('../../../models/Prodcuts/Product-Models'),
  ProductArticles = require('../../../models/Prodcuts/Product-Articles'),
  ProductPackage = require('../../../models/Prodcuts/Product-Packages'),
  ProductSalePlans = require('../../../models/Prodcuts/Product-Sale-Plans'),
  { errorMessages } = require('../../../../middleware/errorMessages')

class ProductArticle {
  async getAllArticle(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: errorMessages.error400,
          code: 400
        })

      const models = await Models.findById(id)
        .populate({
          path: 'articles.currencyId',
          select: '_id name precision'
        })
        .populate({
          path: 'articles.inventoryId',
          select: '_id name'
        })
        .populate({
          path: 'articles.sellerId',
          select: '_id userName'
        })

      if (!models) return res.status(200).json(null)

      res.status(200).json(models.articles)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const result = await ProductArticles.findById(id)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async createArticle(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const models = await Models.findById(id)
      const products = await ProductModel.findById(models.productsId)
      if (!models && !products)
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })
      req.body.productModelId = id
      const productArticles = await ProductArticles.create(req.body)

      models.articles.push(productArticles)
      await models.save()

      const productModels = products.models.id(id)
      productModels.articles.push(productArticles)
      await products.save()

      res.status(200).json(productArticles)
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

      const article = await ProductArticles.findById(id)
      const models = await Models.findById(article.productModelId)
      const products = await ProductModel.findById(models.productsId)
      if (!models && !products && !article)
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const modelArticles = models.articles.id(id)
      modelArticles.stock = req.body.stock || modelArticles.stock
      modelArticles.availabilityStatus =
        req.body.availabilityStatus || modelArticles.availabilityStatus
      modelArticles.currencyId = req.body.currencyId || modelArticles.currencyId
      modelArticles.notifyLowStock = req.body.notifyLowStock || modelArticles.notifyLowStock
      modelArticles.sortOrder = req.body.sortOrder || modelArticles.sortOrder
      modelArticles.default = req.body.default || modelArticles.default
      modelArticles.inventoryId = req.body.inventoryId || modelArticles.inventoryId
      modelArticles.sellerId = req.body.sellerId || modelArticles.sellerId
      await models.save()

      const productModels = products.models.id(article.productModelId)
      const productArticle = productModels.articles.id(id)
      productArticle.stock = req.body.stock || productArticle.stock
      productArticle.availabilityStatus =
        req.body.availabilityStatus || productArticle.availabilityStatus
      productArticle.currencyId = req.body.currencyId || productArticle.currencyId
      productArticle.notifyLowStock = req.body.notifyLowStock || productArticle.notifyLowStock
      productArticle.sortOrder = req.body.sortOrder || productArticle.sortOrder
      productArticle.default = req.body.default || productArticle.default
      productArticle.inventoryId = req.body.inventoryId || productArticle.inventoryId
      productArticle.sellerId = req.body.sellerId || productArticle.sellerId
      await products.save()

      const result = await ProductArticles.findByIdAndUpdate(id, req.body, { new: true })

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

      const article = await ProductArticles.findById(id)
      const models = await Models.findById(article.productModelId)
      const products = await ProductModel.findById(models.productsId)
      if (!models && !products && !article)
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      models.articles.remove(id)
      await models.save()

      const salePlans = article && article.salePlans.length && article.salePlans.map((item) => item)
      const packages =
        article && article.packages.length && article.packages.map((item) => item.packages)

      salePlans &&
        salePlans.forEach(async (salePlan) => {
          await ProductSalePlans.remove({ _id: salePlan._id })
        })

      packages &&
        packages.forEach(async (pack) => {
          await ProductPackage.remove({ _id: pack._id })
        })

      const productModel = products.models.id(article.productModelId)
      productModel.articles.remove(id)
      await products.save()

      ProductArticles.remove({ _id: id })

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

module.exports = new ProductArticle()
