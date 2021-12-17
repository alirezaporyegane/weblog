const mongoose = require('mongoose'),
_ = require('lodash'),
bankAccountsModel = require('../../models/Bank-Accounts'),
{ validatorBankAccount } = require('../validator/Bank-Accounts');

class Banks {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? req.query.sort : ''

    try {
      const result = await bankAccountsModel.find()
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .populate('bankId')
        .select('_id name owner bankId branchCode branchName accountNo sheba cardNo sortOrder')
        .select(include)

      res.status(200).json(result)
    } catch(err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getInfo (req, res) {
    try {
      const result = await bankAccountsModel.aggregate([
        {
          $project: {
            _id: 0,
            text: "$name",
            value: "$_id"
          }
        }
      ])

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getCount (req, res) {
    try {
      const result = await bankAccountsModel.find().countDocuments()

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
        const result = await bankAccountsModel.findById(id)

        res.status(200).json(_.pick(result, ['_id', 'name', 'owner', 'bankId', 'branchCode', 'branchName', 'accountNo', 'sheba', 'cardNo', 'sortOrder']))
      } catch (err) {
        res.status(500).json({
          error: err,
          code: 500
        })
      }
  }


  async create (req, res) {
    const { error } = validatorBankAccount(req.body)
    if (error) return res.status(400).json({
      msg: 'bad Request',
      code: 400
    })

    try {
      const result = bankAccountsModel.create(req.body)

      res.status(200).json(_.pick(result,
        ['_id' ,'name', 'owner', 'bankId', 'branchCode', 'branchName', 'accountNo', 'sheba', 'cardNo', 'sortOrder']))
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

    const { error } = validatorBankAccount(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      success: false
    })

    try {
      const result = bankAccountsModel.findByIdAndUpdate({ _id: id }, { $set: req.body })

      res.status(200).json(_.pick(result, ['_id' , 'name', 'owner', 'bankId', 'branchCode', 'branchName', 'accountNo', 'sheba', 'cardNo', 'sortOrder']))
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
      await bankAccountsModel.remove({ _id: id })
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new Banks()