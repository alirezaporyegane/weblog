const mongoose = require('mongoose'),
  _ = require('lodash'),
  banksModel = require('../../models/Banks'),
  { validatorBanks } = require('../validator/Banks')

class Banks {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    const name = req.query.name ? String(req.query.name) : ''
    const code = req.query.code ? String(req.query.code) : ''

    try {
      const result = await banksModel
        .find({ name: { $regex: name }, code: { $regex: code } })
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select('_id name logo code active')

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async getInfo(req, res) {
    try {
      const result = banksModel.aggregate([
        {
          $project: {
            _id: 0,
            text: '$name',
            value: '$_id',
          },
        },
      ])

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async getCount(req, res) {
    banksModel
      .find()
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

    banksModel
      .findById(id)
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'logo', 'code', 'active']))
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }

  async create(req, res) {
    const { error } = validatorBanks(req.body)
    if (error)
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    const BanksModel = new banksModel({ ..._.pick(req.body, ['name', 'logo', 'code', 'active']) })

    BanksModel.save()
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'logo', 'code', 'active']))
      })
      .catch((err) => {
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

    const { error } = validatorBanks(req.body)
    if (error)
      return res.status(400).json({
        msg: 'Bad Request',
        success: false,
      })

    banksModel
      .findByIdAndUpdate({ _id: id }, _.pick(req.body, ['name', 'logo', 'code', 'active']))
      .then((result) => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'logo', 'code', 'active']))
      })
      .catch((err) => {
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

    banksModel
      .remove({ _id: id })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }
}

module.exports = new Banks()
