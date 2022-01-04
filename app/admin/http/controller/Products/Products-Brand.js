const mongoose = require('mongoose'),
_ = require('lodash');

const Brand = require('../../../models/Prodcuts/Products-Brand');
const { brandValidator } = require('../../validator/Products/Product-Brand'),
{ $hasModule } = require('../../middleware/modules');


class brand {
  async getAll (req, res, next) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    Brand.find(
      { slug: { $regex: slug }, title: { $regex: name } }
    )
    .populate('typeId')
    .skip(skip)
    .limit(limit)
    .sort(Sort)
    .select('_id title slug sortOrder image otherName tags -typeId')
    .select(include)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async getinfo (req, res) {
    Brand.find()
    .select('_id, title')
      .then(result => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async getCount (req, res) {
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''

    Brand.find(
      {slug: { $regex: slug }, title: { $regex: name }}
    )
    .countDocuments()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async getById (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    Brand.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'title', 'slug', 'sortOrder', 'typeId', 'image', 'otherName', 'body']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async create (req, res) {
    const { error } = brandValidator(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    const brand = new Brand(_.pick(req.body,
      ['title','altName' ,'slug', 'sortOrder', 'tags', 'mataTitle', 'metaDescription', 'typeId', 'image', 'otherName', 'body']))

    brand.save()
      .then(result => {
        res.status(200).json(_.pick(result,
          ['_id' ,'title', 'slug', 'sortOrder']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async update (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const { error } = brandValidator(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    Brand.findByIdAndUpdate({ _id: id }, _.pick(req.body,
      ['title','altName' ,'slug', 'sortOrder', 'tags', 'mataTitle', 'metaDescription', 'typeId', 'image', 'otherName', 'body']))
      .then(result => {
        console.log(result)
        res.status(200).json(_.pick(result, ['_id' ,'title', 'slug', 'sortOrder']))
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      }, {new: true})
  }

  async remove (req, res) {
    const id = req.params.brandId

    if (!id) return res.status(400).json({
      msg: 'Bad Request',
      code: 400,
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    Brand.remove({ _id: id })
      .then(() => {
        res.status(204).json({ msg :'success' })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }
}

module.exports = new brand()

