const _ = require('lodash'),
  mongoose = require('mongoose'),
  Product = require('../../../models/Prodcuts/Product'),
  ProductModel = require('../../../models/Prodcuts/Product-Models'),
  ProductType = require('../../../models/Prodcuts/Products-Type'),
  ProductArticles = require('../../../models/Prodcuts/Product-Articles'),
  ProductPackage = require('../../../models/Prodcuts/Product-Packages'),
  ProductSalePlans = require('../../../models/Prodcuts/Product-Sale-Plans'),
  { errorMessages } = require('../../../../middleware/errorMessages'),
  { productModelsValidator } = require('../../validator/Products/ProductModels.validator')

class ProductModels {
  async getAllModels(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      const product = await Product.findById(id)
        .populate({
          path: 'models.articles.currencyId',
          select: '_id name precision'
        })
        .populate({
          path: 'models.articles.inventoryId',
          select: '_id name'
        })
        .populate({
          path: 'models.articles.sellerId',
          select: '_id userName'
        })

      if (!product) return res.status(200).json(null)

      res.status(200).json(product.models)
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

      const result = await ProductModel.findById(id)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: errorMessages.error500,
        code: 500
      })
    }
  }

  async createModels(req, res) {
    try {
      const id = req.params.id

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          data: errorMessages.objectIdError,
          msg: errorMessages.error400,
          code: 400
        })

      const product = await Product.findById(id)
      const productType = await ProductType.findById(product.typeId)

      if (req.body.colorId) {
        const { _id, title, color } = productType.color.find((o) => o.id === req.body.colorId)
        const colorSchema = {
          _id: _id,
          name: title,
          code: color
        }

        req.body.color = colorSchema
      }
      if (req.body.sizeId) {
        const { _id, title } = productType.size.find((o) => o.id === req.body.sizeId)
        const sizeSchema = {
          _id: _id,
          name: title
        }

        req.body.size = sizeSchema
      }
      if (req.body.guaranteeId) {
        const { _id, title } = productType.guarantee.find((o) => o.id === req.body.guaranteeId)
        const guaranteeSchema = {
          _id: _id,
          name: title
        }

        req.body.guarantee = guaranteeSchema
      }
      req.body.productsId = id

      const { error } = productModelsValidator(req.body)
      if (error)
        return res.status(400).json({
          data: error,
          msg: errorMessages.error400,
          code: 400
        })

      const productModel = await ProductModel.create(req.body)

      product.models.push(productModel)
      await product.save()

      res.status(200).json(productModel)
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

      const models = await ProductModel.findById(id)
      const product = await Product.findById(models.productsId)

      const productType = await ProductType.findById(product.typeId)
      if (req.body.colorId) {
        const { _id, title, color } = productType.color.find((o) => o.id === req.body.colorId)
        const colorSchema = {
          _id: _id,
          name: title,
          code: color
        }

        req.body.color = colorSchema
      } else {
        if (models.color) {
          req.body.color = null
        }
      }

      if (req.body.sizeId) {
        const { _id, title } = productType.size.find((o) => o.id === req.body.sizeId)
        const sizeSchema = {
          _id: _id,
          name: title
        }

        req.body.size = sizeSchema
      } else {
        if (models.size) {
          req.body.size = null
        }
      }

      if (req.body.guaranteeId) {
        const { _id, title } = productType.guarantee.find((o) => o.id === req.body.guaranteeId)
        const guaranteeSchema = {
          _id: _id,
          name: title
        }

        req.body.guarantee = guaranteeSchema
      } else {
        if (models.guarantee) {
          req.body.guarantee = null
        }
      }

      const { error } = productModelsValidator(req.body)
      if (error)
        return res.status(400).json({
          data: error,
          msg: errorMessages.error400,
          code: 400
        })

      const productModels = product.models.id(id)
      productModels.description = req.body.description
      productModels.colorId = req.body.colorId
      productModels.sizeId = req.body.sizeId
      productModels.guaranteeId = req.body.guaranteeId
      productModels.default = req.body.default
      productModels.sortOrder = req.body.sortOrder
      productModels.color = req.body.color
      productModels.size = req.body.size
      productModels.guarantee = req.body.guarantee
      await product.save()

      const result = await ProductModel.findByIdAndUpdate(id, req.body, { new: true })

      res.status(200).json(result)
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

      const models = await ProductModel.findById(id)
      const products = await Product.findById(models.productsId)
      products.models.remove(id)

      const productArticles = models && models.length && models.map((item) => item.articles).flat()
      const productPackages =
        productArticles &&
        productArticles.length &&
        productArticles.map((item) => item.packages).flat()
      const productSalePlans =
        productArticles && productArticles.length && productArticles.map((item) => item.salePlans)

      productArticles &&
        productArticles.length &&
        productArticles.forEach(async (item) => {
          await ProductArticles.remove({ _id: item._id })
        })

      productPackages &&
        productPackages.length &&
        productPackages.forEach(async (item) => {
          await ProductPackage.remove({ _id: item._id })
        })

      productSalePlans &&
        productSalePlans.length &&
        productSalePlans.forEach(async (item) => {
          await ProductSalePlans.remove({ _id: item._id })
        })

      await products.save()
      await ProductModel.remove({ _id: id })

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

module.exports = new ProductModels()
