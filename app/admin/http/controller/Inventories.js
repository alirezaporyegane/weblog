const mongoose = require('mongoose'),
  _ = require('lodash'),
  InventoriesModel = require('../../models/Inventories'),
  { validatoInventories } = require('../validator/Inventories')

class Inventories {
  async getAll(req, res) {
    try {
      const filter = {}
      if (req.query.name) filter.name = { $regex: req.query.name }
      if (req.query.code) filter.code = { $regex: req.query.code }
      if (req.query.active) filter.active = req.query.active
      if (req.query.sortOrder) filter.sortOrder = req.query.sortOrder

      const skip = req.query.skip ? parseInt(req.query.skip) : ''
      const limit = req.query.limit ? parseInt(req.query.limit) : ''
      const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

      const result = await InventoriesModel.find(filter)
        .skip(skip)
        .limit(limit)
        .select('_id name sortOrder code active')
        .sort(Sort)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getInfo(req, res) {
    try {
      const filter = {}
      if (req.query.keyword) filter.name = { $regex: req.query.keyword }

      const result = await InventoriesModel.aggregate([
        { $match: filter },
        {
          $project: {
            _id: 0,
            text: '$name',
            value: '$_id'
          }
        }
      ])

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
      if (req.query.name) filter.name = { $regex: req.query.name }
      if (req.query.code) filter.code = { $regex: req.query.code }
      if (req.query.active) filter.active = req.query.active
      if (req.query.sortOrder) filter.sortOrder = req.query.sortOrder

      const result = await InventoriesModel.find(filter).countDocuments()

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
    const id = req.params.id

    if (!id)
      return res.status(400).json({
        msg: 'Inventories Not Found',
        code: 400
      })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    InventoriesModel.findById(id)
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'code', 'active']))
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async create(req, res) {
    const { error } = validatoInventories(req.body)
    if (error)
      return res.status(400).json({
        msg: error.message,
        code: 400
      })

    const inventoriesModel = new InventoriesModel({
      ..._.pick(req.body, ['name', 'sortOrder', 'code', 'active'])
    })

    inventoriesModel
      .save()
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'code', 'active']))
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async update(req, res) {
    const id = req.params.id

    if (!id)
      return res.status(400).json({
        msg: 'Inventories Not Found',
        code: 400
      })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const { error } = validatoInventories(req.body)
    if (error)
      return res.status(400).json({
        msg: error.message,
        success: false
      })

    InventoriesModel.findByIdAndUpdate(
      { _id: id },
      _.pick(req.body, ['name', 'sortOrder', 'code', 'active'])
    )
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'code', 'active']))
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async remove(req, res) {
    const id = req.params.id

    if (!id)
      return res.status(400).json({
        msg: 'Inventories Not Found',
        code: 400
      })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    InventoriesModel.remove({ _id: id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }
}

module.exports = new Inventories()
