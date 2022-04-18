const _ = require('lodash'),
  mongoose = require('mongoose'),
  Product = require('../../../models/Prodcuts/Product'),
  ProductType = require('../../../models/Prodcuts/Products-Type'),
  ProductModel = require('../../../models/Prodcuts/Product-Models'),
  ProductArticles = require('../../../models/Prodcuts/Product-Articles'),
  ProductPackage = require('../../../models/Prodcuts/Product-Packages'),
  ProductSalePlans = require('../../../models/Prodcuts/Product-Sale-Plans'),
  ProductCategories = require('../../../models/Prodcuts/Products-Categories'),
  { productValidate } = require('../../validator/Products/Product')

class products {
  async getAll(req, res) {
    try {
      const filter = {}
      if (req.query.title) filter.title = { $regex: req.query.title }
      if (req.query.altTitle) filter.altTitle = { $regex: req.query.altTitle }
      if (req.query.alert) filter.alert = { $regex: req.query.alert }
      if (req.query.body) filter.body = { $regex: req.query.body }
      if (req.query.excerpt) filter.excerpt = { $regex: req.query.excerpt }
      if (req.query.brandId) filter.brandId = req.query.brandId
      if (req.query.typeId) filter.typeId = req.query.typeId
      if (req.query.userGroupId) filter.userGroupId = req.query.userGroupId
      if (req.query.tab1Body) filter.tab1Body = { $regex: req.query.tab1Body }
      if (req.query.tab2Body) filter.tab2Body = { $regex: req.query.tab2Body }
      if (req.query.tab3Body) filter.tab3Body = { $regex: req.query.tab3Body }
      if (req.query.tab4Body) filter.tab4Body = { $regex: req.query.tab3Body }
      if (req.query.tab5Body) filter.tab5Body = { $regex: req.query.tab3Body }
      if (req.query.tab6Body) filter.tab6Body = { $regex: req.query.tab3Body }
      if (req.query.status) filter.status = req.query.status
      if (req.query.featured) filter.featured = req.query.featured
      if (req.query.commentEnabled) filter.commentEnabled = req.query.commentEnabled
      if (req.query.rateEnabled) filter.rateEnabled = req.query.rateEnabled
      if (req.query.android) filter.android = req.query.android
      if (req.query.ios) filter.ios = req.query.ios
      if (req.query.tags) filter.tags = { $in: req.query.tags }
      if (req.query.metaDescription) filter.metaDescription = { $regex: req.query.metaDescription }
      if (req.query.metaTitle) filter.metaTitle = { $regex: req.query.metaTitle }
      if (req.query.redirect) filter.redirect = { $regex: req.query.redirect }
      if (req.query.slug) filter.slug = { $regex: req.query.slug }
      if (req.query.archive) filter.archive = req.query.archive

      const skip = req.query.skip ? parseInt(req.query.skip) : ''
      const limit = req.query.limit ? parseInt(req.query.limit) : ''
      const include = req.query.include ? req.query.include : ''
      const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

      const result = await Product.find(filter)
        .populate({
          path: 'brandId',
          select: '_id title image'
        })
        .populate({
          path: 'typeId',
          select: '_id title slug'
        })
        .populate({
          path: 'unitId',
          select: '_id name precision'
        })
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select(
          '_id title altTitle slug sortOrder status featured archive -brandId -typeId -unitId'
        )
        .select(include)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getCount(req, res) {
    try {
      const filter = {}
      if (req.query.title) filter.title = { $regex: req.query.title }
      if (req.query.altTitle) filter.altTitle = { $regex: req.query.altTitle }
      if (req.query.alert) filter.alert = { $regex: req.query.alert }
      if (req.query.body) filter.body = { $regex: req.query.body }
      if (req.query.excerpt) filter.excerpt = { $regex: req.query.excerpt }
      if (req.query.brandId) filter.brandId = req.query.brandId
      if (req.query.typeId) filter.typeId = req.query.typeId
      if (req.query.userGroupId) filter.userGroupId = req.query.userGroupId
      if (req.query.tab1Body) filter.tab1Body = { $regex: req.query.tab1Body }
      if (req.query.tab2Body) filter.tab2Body = { $regex: req.query.tab2Body }
      if (req.query.tab3Body) filter.tab3Body = { $regex: req.query.tab3Body }
      if (req.query.tab4Body) filter.tab4Body = { $regex: req.query.tab3Body }
      if (req.query.tab5Body) filter.tab5Body = { $regex: req.query.tab3Body }
      if (req.query.tab6Body) filter.tab6Body = { $regex: req.query.tab3Body }
      if (req.query.status) filter.status = req.query.status
      if (req.query.featured) filter.featured = req.query.featured
      if (req.query.commentEnabled) filter.commentEnabled = req.query.commentEnabled
      if (req.query.rateEnabled) filter.rateEnabled = req.query.rateEnabled
      if (req.query.android) filter.android = req.query.android
      if (req.query.ios) filter.ios = req.query.ios
      if (req.query.tags) filter.tags = { $in: req.query.tags }
      if (req.query.metaDescription) filter.metaDescription = { $regex: req.query.metaDescription }
      if (req.query.metaTitle) filter.metaTitle = { $regex: req.query.metaTitle }
      if (req.query.redirect) filter.redirect = { $regex: req.query.redirect }
      if (req.query.slug) filter.slug = { $regex: req.query.slug }
      if (req.query.archive) filter.archive = req.query.archive

      const result = await Product.find(filter).countDocuments()

      res.status(200).json(result)
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
      console.log(id)
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const result = await Product.findById(id)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async create(req, res) {
    // const {error} = productValidate(req.body)
    // if (error)
    //   return res.status(400).json({
    //     data: error.message
    //     msg: 'Bad Request',
    //     code: 400
    //   })

    try {
      const result = await Product.create(
        _.pick(req.body, [
          'title',
          'altTitle',
          'alert',
          'body',
          'excerpt',
          'header',
          'image',
          'otherImages',
          'fieldGroups',
          'brandId',
          'typeId',
          'userGroupIds',
          'unitId',
          'tab1Body',
          'tab2Body',
          'tab3Body',
          'tab4Body',
          'tab5Body',
          'tab6Body',
          'saleable',
          'relationsId',
          'logical'
        ])
      )

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

      const product = await Product.findById(id)

      const productModels = product && product.models.length && product.models.map((item) => item)
      const productArticles =
        productModels && productModels.length && productModels.map((item) => item.articles).flat()
      const productPackages =
        productArticles &&
        productArticles.length &&
        productArticles.map((item) => item.packages).flat()
      const productSalePlans =
        productArticles && productArticles.length && productArticles.map((item) => item.salePlans)

      productModels.length &&
        productModels.forEach(async (item) => {
          await ProductModel.remove({ _id: item._id })
        })

      productArticles.length &&
        productArticles.forEach(async (item) => {
          await ProductArticles.remove({ _id: item._id })
        })

      productPackages.length &&
        productPackages.forEach(async (item) => {
          await ProductPackage.remove({ _id: item._id })
        })

      productSalePlans.length &&
        productSalePlans.forEach(async (item) => {
          await ProductSalePlans.remove({ _id: item._id })
        })

      await Product.remove({ _id: id })

      res.status(200).json('success')
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async basicPatch(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const {
        title,
        altTitle,
        alert,
        body,
        excerpt,
        header,
        image,
        otherImages,
        fieldGroups,
        brandId,
        typeId,
        userGroupIds,
        unitId,
        tab1Body,
        tab2Body,
        tab3Body,
        tab4Body,
        tab5Body,
        tab6Body,
        saleable,
        relations,
        logical
      } = req.body

      const product = await Product.findById(id).exec()
      if (!product)
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })
      const result = await Product.findByIdAndUpdate(
        id,
        {
          title: title,
          altTitle: altTitle,
          alert: alert,
          body: body,
          excerpt: excerpt,
          header: header,
          image: image,
          otherImages: otherImages,
          fieldGroups: fieldGroups,
          brandId: brandId,
          typeId: typeId,
          userGroupIds: userGroupIds,
          unitId: unitId,
          tab1Body: tab1Body,
          tab2Body: tab2Body,
          tab3Body: tab3Body,
          tab4Body: tab4Body,
          tab5Body: tab5Body,
          tab6Body: tab6Body,
          saleable: saleable,
          relations: relations,
          logical: logical
        },
        { new: true }
      )

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async categoriesPatch(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const product = await Product.findById(id).exec()
      if (!product) return res.status(200).json(null)

      product.categoriesId.splice(0, product.categoriesId.length)
      product.categories.splice(0, product.categories.length)

      const categories = await ProductCategories.find({ _id: { $in: req.body } })
      product.categoriesId = req.body
      product.categories = categories

      const result = await product.save()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async seoPatch(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const { metaDescription, metaTitle, redirect, slug } = req.body

      const product = await Product.findById(id).exec()
      if (!product)
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })
      const result = await Product.findByIdAndUpdate(
        id,
        {
          metaDescription: metaDescription,
          metaTitle: metaTitle,
          redirect: redirect,
          slug: slug
        },
        { new: true }
      )

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async displayPatch(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const { featured, commentEnabled, rateEnabled, android, ios, web, tags } = req.body

      const product = await Product.findById(id).exec()
      if (!product)
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })
      const result = await Product.findByIdAndUpdate(
        id,
        {
          featured: featured,
          commentEnabled: commentEnabled,
          rateEnabled: rateEnabled,
          android: android,
          ios: ios,
          web: web,
          tags: tags
        },
        { new: true }
      )

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async auditPatch(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const { published, auditComment, status } = req.body

      const product = await Product.findById(id).exec()
      if (!product)
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })
      const result = await Product.findByIdAndUpdate(
        id,
        {
          published: published,
          auditComment: auditComment,
          status: status
        },
        { new: true }
      )

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async relationsPost(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const product = await Product.findById(id)

      product.relations.splice(0, product.relations.length)

      product.relations = req.body

      const result = await product.save()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async archivePatch(req, res) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const product = await Product.findById(id)

      if (product.archive) product.archive = false
      else product.archive = true

      await product.save()

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

module.exports = new products()
