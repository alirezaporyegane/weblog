const mongoose = require('mongoose'),
  _ = require('lodash')

const Brand = require('../../../models/Prodcuts/Products-Brand')
const { brandValidator } = require('../../validator/Products/Product-Brand')
class brand {
  async getAll(req, res) {
    const filter = {}
    if (req.query.name) filter.title = { $regex: req.query.name }
    if (req.query.slug) filter.slug = { $regex: req.query.slug }
    if (req.query.altName) filter.altName = { $regex: req.query.altName }
    if (req.query.metaTitle) filter.metaTitle = { $regex: req.query.metaTitle }
    if (req.query.sortOrder) filter.sortOrder =  req.query.sortOrder
    if (req.query.otherName) filter.otherName = req.query.otherName
    if (req.query.tags) filter.tags = req.query.tags

    const skip = req.query.limit ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    try {
      const result = await Brand.find(filter)
        .populate('typeId')
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select('_id title slug sortOrder image otherName tags -typeId')
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

  async getinfo(req, res) {
    try {
      const filter = []
      if (typeof req.query.keyword === 'object') {
        const ids = req.query.keyword.map((id) => mongoose.Types.ObjectId(id))
        filter.push({ $match: { _id: { $in: ids } } })
      } else if (req.query.keyword && mongoose.isValidObjectId(req.query.keyword)) {
        filter.push({ $match: { _id: mongoose.Types.ObjectId(req.query.keyword) } })
      } else if (req.query.keyword) {
        filter.push({ $match: { title: { $regex: req.query.keyword } } })
      }

      if (req.query.limit) filter.push({ $limit: parseInt(req.query.limit) })
      if (req.query.skip) filter.push({ $skip: parseInt(req.query.skip) })

      const items = await Brand.aggregate([
        { $sort: { title: 1 } },
        ...filter,
        {
          $project: {
            _id: 0,
            text: '$title',
            value: '$_id'
          }
        }
      ])

      const count = await Brand.find().countDocuments()

      res.status(200).json({ items, count })
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getCount(req, res) {
    const filter = {}
    if (req.query.name) filter.title = { $regex: req.query.name }
    if (req.query.slug) filter.slug = { $regex: req.query.slug }
    if (req.query.altName) filter.altName = { $regex: req.query.altName }
    if (req.query.metaTitle) filter.metaTitle = { $regex: req.query.altName }
    if (req.query.sortOrder) filter.sortOrder = req.query.sortOrder
    if (req.query.otherName) filter.otherName = req.query.otherName
    if (req.query.tags) filter.tags = req.query.tags

    Brand.find(filter)
      .countDocuments()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          error: err,
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async getById(req, res) {
    const id = req.params.id
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    Brand.findById(id)
      .then((result) => {
        res
          .status(200)
          .json(
            _.pick(result, [
              '_id',
              'title',
              'altName',
              'slug',
              'sortOrder',
              'typeId',
              'image',
              'otherName',
              'body',
              'metaDescription',
              'metaTitle',
              'tags'
            ])
          )
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async create(req, res) {
    const { error } = brandValidator(req.body)
    if (error)
      return res.status(400).json({
        error: error,
        msg: 'Bad Request',
        code: 400
      })

    const brand = new Brand(
      _.pick(req.body, [
        'title',
        'altName',
        'slug',
        'sortOrder',
        'tags',
        'metaTitle',
        'metaDescription',
        'typeId',
        'image',
        'otherName',
        'body'
      ])
    )

    brand
      .save()
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'title', 'slug', 'sortOrder']))
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async update(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const { error } = brandValidator(req.body)
    if (error)
      return res.status(400).json({
        error: error,
        msg: 'Bad Request',
        code: 400
      })

    Brand.findByIdAndUpdate(
      { _id: id },
      _.pick(req.body, [
        'title',
        'altName',
        'slug',
        'sortOrder',
        'tags',
        'metaTitle',
        'metaDescription',
        'typeId',
        'image',
        'otherName',
        'body',
        'altName'
      ])
    )
      .then((result) => {
        console.log(result)
        res.status(200).json(_.pick(result, ['_id', 'title', 'slug', 'sortOrder']))
      })
      .catch(
        (err) => {
          res.status(500).json({
            error: err,
            msg: 'Internal Server Error',
            code: 500
          })
        },
        { new: true }
      )
  }

  async remove(req, res) {
    const id = req.params.brandId

    if (!id)
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    Brand.remove({ _id: id })
      .then(() => {
        res.status(204).json({ msg: 'success' })
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }
}

module.exports = new brand()
