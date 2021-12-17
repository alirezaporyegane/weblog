const mongoose = require('mongoose'),
_ = require('lodash'),
CurrenciesModel = require('../../models/Currencies'),
CurrencyBaseModel = require('../../models/Base-Currency'),
{ ValidatorCurrencies } = require('../validator/Currencies');

class CurrenciesController {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const name = req.query.name ? req.query.name : ''
    const symbol = req.query.symbol ? req.query.symbol : ''

    CurrenciesModel.find(
      {symbol: { $regex: symbol }, name: { $regex: name }}
    )
      .skip(skip)
      .limit(limit)
      .select(['_id' , 'name', 'sortOrder', 'image', 'rate', 'symbol','precision', 'active'])
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

  async getInfo (req, res) {
    CurrenciesModel.find()
    .select("_id name")
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
    const symbol = req.query.symbol ? req.query.symbol : ''

    CurrenciesModel.find(
      {symbol: { $regex: symbol }, name: { $regex: name }}
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

      CurrenciesModel.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'id', 'name', 'sortOrder', 'image', 'rate', 'symbol','precision', 'active']))
      })
      .catch(() => {
        res.status(500).json({
          code: 'Internal Server Error',
          code: 500
        })
      })
  }


  async create (req, res) {
    const {error} = ValidatorCurrencies(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    const currenciesModel = new CurrenciesModel(_.pick(req.body,
      ['id' ,'name', 'sortOrder', 'image', 'rate', 'symbol','precision', 'active']))

    currenciesModel.save()
      .then(result => {
        res.status(200).json(_.pick(result,
          ['_id', 'id', 'name', 'sortOrder', 'image', 'rate', 'symbol','precision', 'active']))
      })
      .catch(() => {
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

    const { error } = ValidatorCurrencies(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      success: false
    })

    CurrenciesModel.findByIdAndUpdate({ _id: id }, _.pick(req.body,
      ['name', 'sortOrder', 'image', 'id', 'rate', 'symbol','precision', 'active']))
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'id', 'image', 'rate', 'symbol','precision', 'active']))
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }

  async remove (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

      CurrenciesModel.remove({ _id: id })
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

  async updateBaseCurrency (req, res) {
    CurrencyBaseModel.find()
      .then(data => {
        if (data.length === 0) {
          const currencyBase = new CurrencyBaseModel(_.pick(res.data, ['baseId','displayId', 'fiscalId']))

          currencyBase.save()
            .then(result => {
              res.status(200).json(result)
            })
            .catch(() => {
              res.status(500).json({
                msg: 'Internal Server Error',
                code: 500
              })
            })
        } else {
          CurrencyBaseModel.updateOne({}, _.pick(req.body, ['baseId','displayId', 'fiscalId']), { new: true })
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
      })
  }

  async getBaseCurrency (req, res) {
    CurrencyBaseModel.findOne()
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
}

module.exports = new CurrenciesController()