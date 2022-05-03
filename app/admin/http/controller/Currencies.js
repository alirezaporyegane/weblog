const mongoose = require('mongoose'),
  _ = require('lodash'),
  CurrenciesModel = require('../../models/Currencies'),
  CurrencyBaseModel = require('../../models/Base-Currency'),
  { ValidatorCurrencies } = require('../validator/Currencies')

class CurrenciesController {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    const filter = {}
    if (req.query.id) filter.id = { $regex: req.query.id }
    if (req.query.name) filter.name = { $regex: req.query.name }
    if (req.query.symbol) filter.symbol = { $regex: req.query.symbol }
    if (req.query.rate) filter.rate = req.query.rate

    CurrenciesModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(Sort)
      .select(['_id', 'name', 'id', 'sortOrder', 'image', 'rate', 'symbol', 'precision', 'active'])
      .select(include)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async getInfo(req, res) {
    try {
      const filter = []
      if (typeof req.query.keyword === 'object') {
        const ids = req.query.keyword.map((id) =>  mongoose.Types.ObjectId(id))
        filter.push({ $match: { _id: { $in: ids } } })
      } else if (req.query.keyword && mongoose.isValidObjectId(req.query.keyword)) {
        filter.push({ $match: { _id: mongoose.Types.ObjectId(req.query.keyword) } })
      } else if (req.query.keyword) {
        filter.push({ $match: { name: { $regex: req.query.keyword } } })
      }

      if (req.query.skip) filter.push({ $skip: parseInt(req.query.skip) })
      if (req.query.limit) filter.push({ $limit: parseInt(req.query.limit) })

      const items = await CurrenciesModel.aggregate([
        { $sort: { name: 1 } },
        ...filter,
        {
          $project: {
            _id: 0,
            text: '$name',
            value: '$_id'
          }
        }
      ])

      const count = await CurrenciesModel.find().countDocuments()

      res.status(200).json({ items, count })
    } catch (err) {
      res.status(500).json({
        error: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getCount(req, res) {
    const filter = {}
    if (req.query.id) filter.id = { $regex: req.query.id }
    if (req.query.name) filter.name = { $regex: req.query.name }
    if (req.query.symbol) filter.symbol = { $regex: req.query.symbol }
    if (req.query.rate) filter.rate = req.query.rate

    CurrenciesModel.find(filter)
      .countDocuments()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
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

    CurrenciesModel.findById(id)
      .then((result) => {
        res
          .status(200)
          .json(
            _.pick(result, [
              '_id',
              'id',
              'name',
              'sortOrder',
              'image',
              'rate',
              'symbol',
              'precision',
              'active'
            ])
          )
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          code: 'Internal Server Error',
          code: 500
        })
      })
  }

  async create(req, res) {
    const { error } = ValidatorCurrencies(req.body)
    if (error)
      return res.status(400).json({
        error: error,
        msg: 'Bad Request',
        code: 400
      })

    const currenciesModel = new CurrenciesModel(
      _.pick(req.body, [
        'id',
        'name',
        'sortOrder',
        'image',
        'rate',
        'symbol',
        'precision',
        'active'
      ])
    )

    currenciesModel
      .save()
      .then((result) => {
        res
          .status(200)
          .json(
            _.pick(result, [
              '_id',
              'id',
              'name',
              'sortOrder',
              'image',
              'rate',
              'symbol',
              'precision',
              'active'
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

  async update(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const { error } = ValidatorCurrencies(req.body)
    if (error)
      return res.status(400).json({
        err: error,
        msg: 'Bad Request',
        success: false
      })

    CurrenciesModel.findByIdAndUpdate(
      { _id: id },
      _.pick(req.body, [
        'name',
        'sortOrder',
        'image',
        'id',
        'rate',
        'symbol',
        'precision',
        'active'
      ])
    )
      .then((result) => {
        res
          .status(200)
          .json(
            _.pick(result, [
              '_id',
              'name',
              'sortOrder',
              'id',
              'image',
              'rate',
              'symbol',
              'precision',
              'active'
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

  async remove(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    CurrenciesModel.remove({ _id: id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async updateBaseCurrency(req, res) {
    CurrencyBaseModel.find().then((data) => {
      if (data.length === 0) {
        const currencyBase = new CurrencyBaseModel(
          _.pick(res.data, ['baseId', 'displayId', 'fiscalId'])
        )

        currencyBase
          .save()
          .then((result) => {
            res.status(200).json(result)
          })
          .catch(() => {
            res.status(500).json({
              msg: 'Internal Server Error',
              code: 500
            })
          })
      } else {
        CurrencyBaseModel.updateOne({}, _.pick(req.body, ['baseId', 'displayId', 'fiscalId']), {
          new: true
        })
          .then((result) => {
            res.status(200).json(result)
          })
          .catch(() => {
            res.status(500).json({
              msg: 'Internal Server Error',
              code: 500
            })
          })
      }
    })
  }

  async getBaseCurrency(req, res) {
    CurrencyBaseModel.findOne()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }
}

module.exports = new CurrenciesController()
