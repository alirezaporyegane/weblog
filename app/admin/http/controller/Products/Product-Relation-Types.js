const mongoose = require('mongoose'),
  _ = require('lodash'),
  ProductRelationTypesModel = require('../../../models/Prodcuts/Product-Relation-Types'),
  { validatoProductRelationTypes } = require('../../validator/Products/Product-Relation-Types')

class Inventories {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? req.require.sort : ''

    ProductRelationTypesModel.find()
      .skip(skip)
      .limit(limit)
      .select('_id primarySideName relatedSideName sortOrder')
      .sort(Sort)
      .select(include)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }

  async getInfo(req, res) {
    ProductRelationTypesModel
      .find()
      .select('_id primarySideName relatedSideName')
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }

  async getCount(req, res) {
    ProductRelationTypesModel.find()
      .countDocuments()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }

  async getById(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    ProductRelationTypesModel.findById(id)
      .then((result) => {
        res
          .status(200)
          .json(_.pick(result, ['_id', 'primarySideName', 'relatedSideName', 'sortOrder']))
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }

  async create(req, res) {
    const { error } = validatoProductRelationTypes(req.body)
    if (error)
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    const productRelationTypesModel = new ProductRelationTypesModel(
      _.pick(req.body, ['primarySideName', 'relatedSideName', 'sortOrder'])
    )

    productRelationTypesModel
      .save()
      .then((result) => {
        res
          .status(200)
          .json(_.pick(result, ['_id', 'primarySideName', 'relatedSideName', 'sortOrder']))
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }

  async update(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    const { error } = validatoProductRelationTypes(req.body)
    if (error)
      return res.status(400).json({
        msg: 'Bad Request',
        success: false,
      })

    ProductRelationTypesModel.findByIdAndUpdate(
      { _id: id },
      _.pick(req.body, ['primarySideName', 'relatedSideName', 'sortOrder'])
    )
      .then((result) => {
        res
          .status(200)
          .json(_.pick(result, ['_id', 'primarySideName', 'relatedSideName', 'sortOrder']))
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }

  async remove(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    ProductRelationTypesModel.remove({ _id: id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }
}

module.exports = new Inventories()
