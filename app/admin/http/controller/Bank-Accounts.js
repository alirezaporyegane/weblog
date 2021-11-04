const mongoose = require('mongoose'),
_ = require('lodash'),
bankAccountsModel = require('../../models/bank-accounts'),
{ validatorBankAccount } = require('../validator/Bank-Accounts');

class Banks {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? req.query.sort : ''

    bankAccountsModel.find()
      .skip(skip)
      .limit(limit)
      .sort(Sort)
      .populate('bankId')
      .select('_id name owner bankId branchCode branchName accountNo sheba cardNo sortOrder')
      .select(include)
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json({
            error: err,
            code: 500
          })
        })
  }

  async getCount (req, res) {
    bankAccountsModel.find()
    .countDocuments()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async getById (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Bank Account Not Found',
      code: 400
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

      bankAccountsModel.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'owner', 'bankId', 'branchCode', 'branchName', 'accountNo', 'sheba', 'cardNo', 'sortOrder']))
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  
  async create (req, res) {
    const { error } = validatorBankAccount(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      code: 400
    })
  
    const BankAccountsModel = new bankAccountsModel({..._.pick(req.body, 
      ['name', 'owner', 'bankId', 'branchCode', 'branchName', 'accountNo', 'sheba', 'cardNo', 'sortOrder'])
    })
  
    BankAccountsModel.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          ['_id' ,'name', 'owner', 'bankId', 'branchCode', 'branchName', 'accountNo', 'sheba', 'cardNo', 'sortOrder']))
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async update (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Bank Acconts Not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
    const {error} = validatorBankAccount(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
    
    bankAccountsModel.findByIdAndUpdate({ _id: id }, _.pick(req.body, 
      ['name', 'owner', 'bankId', 'branchCode', 'branchName', 'accountNo', 'sheba', 'cardNo', 'sortOrder']))
      .then(result => {
        res.status(200).json(_.pick(result, ['_id' , 'name', 'owner', 'bankId', 'branchCode', 'branchName', 'accountNo', 'sheba', 'cardNo', 'sortOrder']))
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  async remove (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Bank Accounts Not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
      bankAccountsModel.remove({ _id: id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }
}

module.exports = new Banks()