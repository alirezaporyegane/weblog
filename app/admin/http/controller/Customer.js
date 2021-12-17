const  mongoose  = require('mongoose');
const Customer = require('../../models/Customers');
const { ValidateCustomer } = require('../validator/Customer')

class customer {
  async getAll (req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const sort = req.query.limit ? parseInt(req.query.limit) : ''
    Customer.find().skip(skip).limit(limit).sort({ fristName: sort })
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

  async getCount (req, res) {
    Customer.find().countDocuments()
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

  async getById (req, res) {
    const id = req.params.id

    if (!id) return res.status(404).json({
      msg: 'Id Not Found',
      success: false
    })

    if (!mongoose.isValidObjectId(id))
    return res.status(400).json({
      msg: 'Bad Id',
      success: false
    })

    Customer.findById(id)
      .then(result => {
        console.log(result)
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(result)
        res.status(500).json({
          error: err,
          success: false
        })
      })
  }

  async create (req, res) {
    const { error } = ValidateCustomer(req.body)
    if (error) return res.status(400).json({
      message: error.message,
      success: false
    })

    const customer = new Customer({
      fristName: req.body.fristName,
      latsName: req.body.latsName,
      email: req.body.email,
      address: req.body.address
    })

    customer.save()
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

  async updated (req, res) {
    const id = req.params.id

    if (!id) return res.status(404).json({
      msg: 'Id Not Found',
      success: false
    })

    const { error } = ValidateCustomer(req.body)
    if (error) return res.status(400).json({
      message: error.message
    })

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Id',
        success: false
      })

    Customer.findByIdAndUpdate((id), {
      fristName: req.body.fristName,
      latsName: req.body.latsName,
      email: req.body.email,
      address: req.body.address
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
      const id = req.params.id

      if (!id) return res.status(400).json({
        msg: 'Id Not Found',
        success: false
      })

      if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Id',
        success: false
      })

      Customer.findByIdAndRemove({ _id: id })
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

module.exports = new customer()