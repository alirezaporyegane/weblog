const  mongoose  = require('mongoose'),
Menu = require('../../models/menu'),
{ menuValidator } = require('../validator/Menu')
_ = require('lodash')

class menuController {
  async getAll (req, res) {
    Menu.find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async getById (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({
      msg: 'id is not valid'
    })

    Menu.findById(id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async create (req, res) {
    const { error } = menuValidator(req.body)
    if (error) return res.status(400).json(error.message)

    const menu = new Menu(_.pick(req.body, ['title', 'url', 'target', 'icon', 'viewData', 'parentId', 'components', 'sortOrder', 'availability']))

    menu.save()
      .then(result => {
        res.status(200).json(_.pick(result, ['title', 'url', 'target', 'icon', 'viewData', 'availability', 'components']))
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async updete (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({
      msg: 'id is not valid'
    })

    const { error } = menuValidator(req.body)
    if (error) return res.status(400).json(error.message)

    Menu.findByIdAndUpdate({ _id: id }, 
      _.pick(req.body, ['title', 'url', 'target', 'icon', 'viewData', 'parentId', 'components', 'sortOrder', 'availability']),
      { new: true })
        .then(result => {
          _.pick(result, ['title', 'url', 'target', 'icon', 'viewData', 'availability', 'components'])
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
      })
  }

  async delete (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({
      msg: 'id is not valid'
    })

    Menu.remove({ _id: id })
      .then(() => {
        res.status(200).json(true)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }
}

module.exports = new menuController()