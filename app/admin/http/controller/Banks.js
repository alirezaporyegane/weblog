const mongoose = require('mongoose'),
  _ = require('lodash'),
  BanksModel = require('../../models/Banks'),
  { validatorBanks } = require('../validator/Banks'),
  { errorMessages } = require('../../../middleware/errorMessages')

class Banks {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    const filter = {}
    if (req.query.name) filter.name = { $regex: req.query.name }
    if (req.query.code) filter.code = { $regex: req.query.code }
    if (req.query.active) filter.active = req.query.active

    try {
      const result = await BanksModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select('_id name logo code active')

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: errorMessages.error500,
        data: err,
        code: 500
      })
    }
  }

  async getInfo(req, res) {
    try {
      const filter = []
      if (typeof req.query.keyword === 'object') {
        const ids = req.query.keyword.map((id) => mongoose.Types.ObjectId(id))
        filter.push({ $match: { _id: { $in: ids } } })
      } else if (req.query.keyword && mongoose.isValidObjectId(req.query.keyword)) {
        filter.push({ $match: { _id: mongoose.Types.ObjectId(req.query.keyword) } })
      } else if (req.query.keyword) {
        filter.push({ $match: { name: { $regex: req.query.keyword } } })
      }

      if (req.query.skip) filter.push({ $skip: parseInt(req.query.skip) })
      if (req.query.limit) filter.push({ $limit: parseInt(req.query.limit) })

      const result = BanksModel.aggregate([
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

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: errorMessages.error500,
        data: err,
        code: 500
      })
    }
  }

  async getCount(req, res) {
    const filter = {}
    if (req.query.name) filter.name = { $regex: req.query.name }
    if (req.query.code) filter.code = { $regex: req.query.code }
    if (req.query.active) filter.active = req.query.active

    try {
      const result = await BanksModel.find(filter).countDocuments()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: errorMessages.error500,
        data: err,
        code: 500
      })
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: errorMessages.error400,
          data: errorMessages.objectIdError,
          code: 400
        })

      const result = await BanksModel.findById(id)

      res.status(200).json(_.pick(result, ['_id', 'name', 'logo', 'code', 'active']))
    } catch (err) {
      res.status(500).json({
        msg: errorMessages.error500,
        data: err,
        code: 500
      })
    }
  }

  async create(req, res) {
    try {
      const { error } = validatorBanks(req.body)
      if (error)
        return res.status(400).json({
          msg: errorMessages.error400,
          data: error.message,
          code: 400
        })

      const result = await BanksModel.create(_.pick(req.body, ['name', 'logo', 'code', 'active']))

      res.status(200).json(_.pick(result, ['_id', 'name', 'logo', 'code', 'active']))
    } catch (err) {
      res.status(500).json({
        msg: errorMessages.error500,
        data: err,
        code: 500
      })
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: errorMessages.error400,
          data: errorMessages.objectIdError,
          code: 400
        })

      const { error } = validatorBanks(req.body)
      if (error)
        return res.status(400).json({
          msg: errorMessages.error400,
          data: error.message,
          code: 400
        })

      const result = await BanksModel.findByIdAndUpdate(
        { _id: id },
        _.pick(req.body, ['name', 'logo', 'code', 'active'])
      )

      res.status(200).json(_.pick(result, ['_id', 'name', 'logo', 'code', 'active']))
    } catch (err) {
      res.status(500).json({
        msg: errorMessages.error500,
        data: err,
        code: 500
      })
    }
  }

  async remove(req, res) {
    try {
      const id = req.params.id

      if (!mongoose.isValidObjectId(id))
        return res.status(400).json({
          msg: errorMessages.error400,
          data: errorMessages.objectIdError,
          code: 400
        })

      await BanksModel.remove({ _id: id })

      res.status(200).json('success')
    } catch (err) {
      res.status(500).json({
        msg: errorMessages.error500,
        data: err,
        code: 500
      })
    }
  }
}

module.exports = new Banks()
