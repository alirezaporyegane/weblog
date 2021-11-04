const mongoose = require('mongoose'),
_ = require('lodash'),
banksModel = require('../../models/banks'),
{ validatorBanks } = require('../validator/Banks');

class Banks {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? req.query.sort : ''

    banksModel.find()
      .skip(skip)
      .limit(limit)
      .sort(Sort)
      .select('_id name logo code active')
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
    banksModel.find()
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
      msg: 'Banks Not Found',
      code: 400
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

      banksModel.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'logo', 'code', 'active']))
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  
  async create (req, res) {
    const { error } = validatorBanks(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      code: 400
    })
  
    const BanksModel = new banksModel({..._.pick(req.body, 
      ['name', 'logo', 'code', 'active'])
    })
  
    BanksModel.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          ['_id' ,'name', 'logo', 'code', 'active']))
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
      msg: 'Banks Not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
    const {error} = validatorBanks(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
    
    banksModel.findByIdAndUpdate({ _id: id }, _.pick(req.body, 
      ['name', 'logo', 'code', 'active']))
      .then(result => {
        res.status(200).json(_.pick(result, ['_id' ,'name', 'logo', 'code', 'active']))
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
      msg: 'Banks Not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
      banksModel.remove({ _id: id })
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