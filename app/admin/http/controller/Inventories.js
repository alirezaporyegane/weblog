const mongoose = require('mongoose'),
  _ = require('lodash'),
  InventoriesModel = require('../../models/Inventories'),
  { validatoInventories } = require('../validator/Inventories')

class Inventories {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const name = req.query.name ? req.query.name : ''
    const code = req.query.code ? req.query.code : ''

    InventoriesModel.find({ name: { $regex: name }, code: { $regex: code } })
      .skip(skip)
      .limit(limit)
      .select('_id name sortOrder code active')
      .select(include)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 500,
        })
      })
  }

  async getCount(req, res) {
    const name = req.query.name ? req.query.name : ''
    const code = req.query.code ? req.query.code : ''

    InventoriesModel.find({ name: { $regex: name }, code: { $regex: code } })
      .countDocuments()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 500,
        })
      })
  }

  async getById(req, res) {
    const id = req.params.id

    if (!id)
      return res.status(400).json({
        msg: 'Inventories Not Found',
        code: 400,
      })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    InventoriesModel.findById(id)
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'code', 'active']))
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 500,
        })
      })
  }

  async create(req, res) {
    const { error } = validatoInventories(req.body)
    if (error)
      return res.status(400).json({
        msg: error.message,
        code: 400,
      })

    const inventoriesModel = new InventoriesModel({
      ..._.pick(req.body, ['name', 'sortOrder', 'code', 'active']),
    })

    inventoriesModel
      .save()
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'code', 'active']))
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 500,
        })
      })
  }

  async update(req, res) {
    const id = req.params.id

    if (!id)
      return res.status(400).json({
        msg: 'Inventories Not Found',
        code: 400,
      })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    const { error } = validatoInventories(req.body)
    if (error)
      return res.status(400).json({
        msg: error.message,
        success: false,
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
          code: 500,
        })
      })
  }

  async remove(req, res) {
    const id = req.params.id

    if (!id)
      return res.status(400).json({
        msg: 'Inventories Not Found',
        code: 400,
      })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    InventoriesModel.remove({ _id: id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 500,
        })
      })
  }
}

module.exports = new Inventories()
