const mongoose = require('mongoose'),
Order = require('../../models/Order'),
{ ValidateOrder } = require('../validator/Order');

class order {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const sort = req.query.sort ? parseInt(req.query.sort) : ''
    Order.find().skip(skip).limit(limit).sort({ title: sort, quntity: sort })
      .then(result => {
        res.status(200).json(result)
     })
     .catch(err => {
       console.log(err)
       res.status(500).json({
         msg: 'Get Has Failed',
         error: err,
         success: false
       })
     })
  }

  async getCount (req, res) {
    Order.find().countDocuments()
    .then(result => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        msg: 'Get Count Has Failed',
        error: err,
        success: false
      })
    })
  }

  async getById (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Id Not Found',
      success: false
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Id Is Not Correct',
        success: false
      })

    Order.findById(id)
      .then(result => {
        console.log(result)
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err,
          success: false
        })
      })
  }

  async create (req, res) {
    const { error } = ValidateOrder(req.body);
    if (error)
      return res.status(400).json({
        message: error.message,
        success: false
      })

    const order = new Order({
      title: req.body.title,
      quntity: req.body.quntity,
    })

    order.save()
      .then(result => {
        console.log(result)
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err,
          success: false
        })
      })
  }

  async update (req, res) {
    const id = req.params.id

    if (!id) return res.status(400).json({
      msg: 'Id Not Found',
      success: false
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Id Is Not Correct',
        success: false
      })

    const { error } = ValidateOrder(req.body)
    if (error) return res.status(400).json({
      msg: error.message,
      success: false
    })

    Order.findByIdAndUpdate((id), {
      title: req.body.title,
      quntity: req.body.quntity
    })
      .then(result => {
        console.log(result)
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err,
          success: false
        })
      })
  }

  async remove (req, res) {
    const Id = req.params.id

    if (!Id) return res.status(400).json({
      msg: 'Bad Request',
      success: false
    })

    if (!mongoose.isValidObjectId(Id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })

    Order.findByIdAndDelete(Id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err,
          success: false
        })
      })
  }
}

module.exports = new order()