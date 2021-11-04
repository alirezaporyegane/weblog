const mongoose = require('mongoose'),
_ = require('lodash'),
DeliveryMethodsModle = require('../../models/deliveryMethods'),
{ validateDeliveryMethods } = require('../validator/DeliveryMethods');

class DeliveryMethodsController {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''

    DeliveryMethodsModle.find()
      .skip(skip)
      .limit(limit)
      .select('_id name sortOrder description image hideFee rangesFeeType payOnDelivery calculationMethod baseFee ranges active')
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
    DeliveryMethodsModle.find()
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
      msg: 'Inventories Not Found',
      code: 400
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

      DeliveryMethodsModle.findById(id)
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'image', 'hideFee', 'rangesFeeType', 'payOnDelivery', 'calculationMethod', 'baseFee', 'ranges', 'active']))
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          code: 500
        })
      })
  }

  
  async create (req, res) {
    const { error } = validateDeliveryMethods(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      code: 400
    })
  
    const deliveryMethodsModle = new DeliveryMethodsModle({..._.pick(req.body, 
      ['name', 'sortOrder', 'image', 'hideFee', 'rangesFeeType', 'payOnDelivery', 'calculationMethod', 'baseFee', 'ranges', 'active'])
    })
  
    deliveryMethodsModle.save()
      .then(result => {
        res.status(200).json(_.pick(result, 
          ['_id', 'name', 'sortOrder', 'image', 'hideFee', 'rangesFeeType', 'calculationMethod', 'payOnDelivery', 'baseFee', 'ranges', 'active']))
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
      msg: 'Inventories Not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
    const {error} = validateDeliveryMethods(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })
    
    DeliveryMethodsModle.findByIdAndUpdate({ _id: id }, _.pick(req.body, 
      ['name', 'sortOrder', 'image', 'hideFee', 'rangesFeeType', 'calculationMethod', 'payOnDelivery', 'baseFee', 'ranges', 'active']))
      .then(result => {
        res.status(200).json(_.pick(result, ['_id', 'name', 'sortOrder', 'image', 'hideFee', 'rangesFeeType', 'payOnDelivery', 'calculationMethod', 'baseFee', 'ranges', 'active']))
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
      msg: 'Inventories Not Found',
      code: 400
    })
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })
  
      DeliveryMethodsModle.remove({ _id: id })
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

module.exports = new DeliveryMethodsController()