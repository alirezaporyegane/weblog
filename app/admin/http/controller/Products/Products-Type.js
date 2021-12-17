const mongoose = require('mongoose'),
_ = require('lodash'),
ProductType = require('../../../models/Prodcuts/Products-Type'),
{ ValidateProductType } = require('../../validator/Products/Products-Type');

class ProductsType {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''
    const title = req.query.title ? req.query.title : ''

    try {
      const result = await ProductType.find({title: { $regex: title }})
      .populate('typeId')
      .populate('unit')
      .skip(skip)
      .limit(limit)
      .sort(Sort)
      .select('-typeId -unit -color -size -guarantee -fieldTypeGroups -tab1 -tab2 -tab3 -tab4 -tab5 -tab6 -r1 -r2 -r3 -r4 -r5 -r6')
      .select(include)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getInfo (req, res) {
    try {
      const result = await ProductType.aggregate([
        {
          $project: {
            _id: 0,
            text: "$title",
            value: "$_id"
          }
        }
      ])

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }

  }

  async getCount (req, res) {
    try {
      const title = req.query.title ? req.query.title : ''

      const result = await ProductType.find({ title: { $regex: title } }).countDocuments()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getById (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
    return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })
    try {
      const result = await ProductType.findById(id)

      res.status(200).json(_.pick(result, ['_id' ,'title', 'slug', 'sortOrder', 'active', 'typeId', 'unit', 'color', 'size', 'guarantee', 'fieldTypeGroups', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6',
      'tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6']))
    } catch (err) {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      }
  }

  async create (req, res) {
    const { error } = ValidateProductType(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    try {
      const result = await ProductType.create(req.body)

      res.status(200).json(_.pick(result,
        ['_id' ,'title', 'slug', 'sortOrder', 'active', 'typeId', 'unit', 'color', 'size', 'guarantee', 'fieldTypeGroups', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6',
        'tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6']))
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async update (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const { error } = ValidateProductType(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    try {
      const result = ProductType.findByIdAndUpdate({ _id: id }, { $set: req.body })

      res.status(200).json(_.pick(result, ['_id' ,'title', 'slug', 'sortOrder', 'active', 'typeId', 'unit', 'color', 'size', 'guarantee', 'fieldTypeGroups', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6',
      'tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6']))
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async remove (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    try {
      await ProductType.remove({ _id: id })
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new ProductsType()

