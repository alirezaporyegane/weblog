const _ = require('lodash'),
  mongoose = require('mongoose')
Pages = require('../../../models/Pages/Pages')

class pagescontroller {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

    try {
      const result = await Pages.find({ slug: { $regex: slug }, title: { $regex: name } })
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select('_id title slug')
        .select(include)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async getCount(req, res) {
    const name = req.query.name ? req.query.name : ''
    const slug = req.query.slug ? req.query.slug : ''

    try {
      const result = await Pages.find({
        slug: { $regex: slug },
        title: { $regex: name },
      }).countDocuments()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async getById(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    try {
      const result = await Pages.findById(id)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async create(req, res) {
    try {
      const result = await Pages.create(req.body)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async update(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    try {
      const result = await Pages.findByIdAndUpdate({ _id: id }, req.body, { new: true })

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async remove(req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400,
      })

    try {
      await Pages.remove({ _id: id })

      res.status(200).json('success')
    } catch (er) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }
}

module.exports = new pagescontroller()
