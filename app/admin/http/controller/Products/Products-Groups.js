const mongoose = require('mongoose'),
_ = require('lodash'),
ProductsGroupModel = require('../../../models/Prodcuts/Products-Groups'),
{ validatoProductGroup } = require('../../validator/Products/Product-Group');

class ProductsGroup {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''

    try {
      const result = await ProductsGroupModel.find({ slug: { $regex: slug }, name: { $regex: name }})
      .populate('categories.productType')
      .skip(skip)
      .limit(limit)
      .sort(Sort)
      .select('_id name color slug sortOrder image description metaTitle metaDescription sortOrder categories')
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

  async getCount (req, res) {
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''

    try {
      const result = await ProductsGroupModel
      .find({ slug: { $regex: slug }, title: { $regex: name } })
      .countDocuments()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getInfo (req, res) {
    const result = await ProductsGroupModel
  }

  async getById (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).josn({
        msg: 'Bad Requset',
        code: 400
      })

    try {
      const result = await ProductsGroupModel.findById(id)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async create (req, res) {
    const { error } = validatoProductGroup(req.bodu)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    try {
      const result = await ProductsGroupModel.create(req.body)

      res.status(200).json(result)
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async update (req, res) {

  }

  async remove (req, res) {

  }
}

module.exports = new ProductsGroup()