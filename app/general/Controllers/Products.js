const mongoose = require('mongoose'),
  ProdcutModel = require('../../admin/models/Prodcuts/Product')

class Prodcuts {
  async getAllBySearch(req, res) {
    try {
      const filter = {}
      if (req.body.keyword) filter.title = req.body.keyword

      if (req.body.tags && req.body.tags.length) filter.tegs = { $in: req.body.tags }

      if (req.body.categoryIds && req.body.categoryIds.length)
        filter.categoriesId = { $in: req.body.categoryIds }

      if (req.body.groupIds && req.body.groupIds.length)
        filter['categories.groupId'] = { $in: req.body.groupIds }

      if (req.body.categorySlug) filter['categories.slug'] = req.body.categorySlug

      if (req.body.groupSlug) filter['categories.group.slug'] = req.body.groupSlug

      if (req.body.sellerIds && req.body.sellerIds.length)
        filter['models.articles.sellerId'] = { $in: req.body.sellerIds }

      if (req.body.brandIds && req.body.brandIds.length) filter.brandId = { $in: req.body.brandIds }

      if (req.body.typeId) filter.typeId = req.body.typeId

      if (req.body.sizeIds && req.body.sizeIds.length)
        filter['models.sizeId'] = { $in: req.body.sizeIds }

      if (req.body.colorIds && req.body.colorIds.length)
        filter['models.colorId'] = { $in: req.body.colorIds }

      if (req.body.guaranteeIds && req.body.guaranteeIds.length)
        filter['models.guaranteeId'] = { $in: req.body.guaranteeIds }

      if (req.body.availableOnly) filter['models.articles.availabilityStatus'] = 1

      if (req.body.featuredOnly) filter.featured = req.body.featuredOnly

      if (req.body.minPrice && req.body.maxPrice)
        filter['models.articles.salePlans.priceAfterDiscount'] = {
          $gte: req.body.minPrice,
          $lte: req.body.maxPrice
        }
      const skip = req.body.skip ? parseInt(req.body.skip) : ''
      const limit = req.body.limit ? parseInt(req.body.limit) : ''
      const Sort = req.body.sort ? eval(`({${req.body.sort}})`) : ''

      const total = await ProdcutModel.find(filter).countDocuments()
      const hits = await ProdcutModel.find(filter)
        .populate({
          path: 'brandId',
          select: '_id title image'
        })
        .populate('typeId')
        .populate('unitId')
        .populate({
          path: 'models.articles.currencyId',
          select: '_id name precision'
        })
        .populate({
          path: 'models.articles.inventoryId',
          select: '_id name'
        })
        .skip(skip)
        .limit(limit)
        .sort(Sort)

      res.status(200).json({ total, hits })
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

      const result = await ProdcutModel.findById(id)
        .populate({
          path: 'brandId',
          select: '_id title image'
        })
        .populate('typeId')
        .populate('unitId')
        .populate({
          path: 'models.articles.currencyId',
          select: '_id name precision'
        })
        .populate({
          path: 'models.articles.inventoryId',
          select: '_id name'
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

  async createCompareProduct(req, res) {}
}

module.exports = new Prodcuts()
