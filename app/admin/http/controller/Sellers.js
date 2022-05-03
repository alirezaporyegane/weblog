const mongoose = require('mongoose'),
  _ = require('lodash'),
  bcrypt = require('bcrypt'),
  Account = require('../../../shared/models/Account')
class Customer {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    const filter = {}
    if (req.query.userName) filter.userName = { $regex: req.query.userName }
    if (req.query.firstName) filter.firstName = { $regex: req.query.firstName }
    if (req.query.lastName) filter.lastName = { $regex: req.query.lastName }
    if (req.query.companyName) filter.companyName = { $regex: req.query.companyName }
    if (req.query.companyName) filter.companyName = { $regex: req.query.companyName }
    if (req.query.email) filter.email = { $regex: req.query.email }
    if (req.query.phoneNumber) filter.phoneNumber = { $regex: req.query.phoneNumber }
    if (req.query.emailConfirmed) filter.emailConfirmed = req.query.emailConfirmed
    if (req.query.phoneNumberConfirmed) filter.phoneNumberConfirmed = req.query.phoneNumberConfirmed
    if (req.query.suspended) filter.suspended = req.query.suspended
    filter.userType = 0

    try {
      const result = await Account.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select([
          'firstName',
          'lastName',
          'companyName',
          'legality',
          'image',
          'userName',
          'email',
          'confirmEmail',
          'phoneNumber',
          'confirmPhoneNumber',
          'suspended',
          'confirmedProfile',
          'code',
          'userGroupSaleLimit',
          'profileFields'
        ])

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getCount(req, res) {
    const filter = {}
    if (req.query.userName) filter.userName = { $regex: req.query.userName }
    if (req.query.firstName) filter.firstName = { $regex: req.query.firstName }
    if (req.query.lastName) filter.lastName = { $regex: req.query.lastName }
    if (req.query.companyName) filter.companyName = { $regex: req.query.companyName }
    if (req.query.companyName) filter.companyName = { $regex: req.query.companyName }
    if (req.query.email) filter.email = { $regex: req.query.email }
    if (req.query.phoneNumber) filter.phoneNumber = { $regex: req.query.phoneNumber }
    if (req.query.emailConfirmed) filter.emailConfirmed = req.query.emailConfirmed
    if (req.query.phoneNumberConfirmed) filter.phoneNumberConfirmed = req.query.phoneNumberConfirmed
    if (req.query.suspended) filter.suspended = req.query.suspended
    filter.userType = 0

    try {
      const result = await Account.find(filter).countDocuments()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getInfo(req, res) {
    try {
      const filter = []
      if (typeof req.query.keyword === 'object') {
        const ids = req.query.keyword.map((id) => mongoose.Types.ObjectId(id))
        filter.push({ $match: { _id: { $in: ids }, userType: 0 } })
      } else if (req.query.keyword && mongoose.isValidObjectId(req.query.keyword)) {
        filter.push({ $match: { _id: mongoose.Types.ObjectId(req.query.keyword), userType: 0 } })
      } else if (req.query.keyword) {
        filter.push({ $match: { userName: { $regex: req.query.keyword }, userType: 0 } })
      } else {
        filter.push({ $match: { userType: 0 } })
      }

      if (req.query.skip) filter.push({ $skip: parseInt(req.query.skip) })
      if (req.query.limit) filter.push({ $limit: parseInt(req.query.limit) })

      const items = await Account.aggregate([
        { $sort: { name: 1 } },
        ...filter,
        {
          $project: {
            _id: 0,
            text: '$userName',
            value: '$_id'
          }
        }
      ])

      const count = await Account.find({ userType: 0 }).countDocuments()

      res.status(200).json({ items, count })
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getById(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    try {
      const result = await Account.findById(id)

      res
        .status(200)
        .json(
          _.pick(result, [
            'firstName',
            'lastName',
            'companyName',
            'legality',
            'image',
            'userName',
            'email',
            'confirmEmail',
            'phoneNumber',
            'confirmPhoneNumber',
            'suspended',
            'confirmedProfile',
            'code',
            'userGroupSaleLimit',
            'profileFields'
          ])
        )
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async create(req, res) {
    try {
      const hash = await bcrypt.hash(req.body.password, 12)

      const account = await Account.find({
        userType: req.body.userType,
        phoneNumber: req.body.phoneNumber
      })

      if (account.length >= 1) {
        return res.status(409).json({
          msg: 'Conflict',
          code: 409
        })
      }

      req.body.password = hash
      const result = await Account.create(req.body)

      res
        .status(200)
        .json(
          _.pick(result, [
            'firstName',
            'lastName',
            'companyName',
            'legality',
            'image',
            'userName',
            'email',
            'confirmEmail',
            'phoneNumber',
            'confirmPhoneNumber',
            'suspended',
            'confirmedProfile',
            'code',
            'userGroupSaleLimit',
            'profileFields'
          ])
        )
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async updated(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })

    try {
      const result = await Account.findByIdAndUpdate(id, req.body, { new: true })

      res
        .status(200)
        .json(
          _.pick(result, [
            'firstName',
            'lastName',
            'companyName',
            'legality',
            'image',
            'userName',
            'email',
            'confirmEmail',
            'phoneNumber',
            'confirmPhoneNumber',
            'suspended',
            'confirmedProfile',
            'code',
            'userGroupSaleLimit',
            'profileFields'
          ])
        )
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async remove(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        success: false
      })

    try {
      await Account.findByIdAndRemove({ _id: id })

      res.status(200).json(true)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new Customer()
