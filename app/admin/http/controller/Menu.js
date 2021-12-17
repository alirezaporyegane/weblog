const Menu = require('../../models/Menu'),
{ menuValidator } = require('../validator/Menu')
_ = require('lodash');

class menuController {
  async getAll (req, res) {
    Menu.find().sort({ sortOrder: 1 })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async updete (req, res) {
    Menu.find()
      .then(data => {
        if (data.length > 0) {
          Menu.deleteMany({})
            .then(() => {
              Menu.insertMany(req.body)
                .then(result => {
                  res.status(200).json(result)
                }).catch(() => {
                  res.status(500).json({
                    msg: 'Internal Server Error',
                    code: 500,
                  })
                })
            })
        } else {
          Menu.insertMany(req.body)
            .then(result => {
              res.status(200).json(result)
            }).catch(() => {
              res.status(500).json({
                msg: 'Internal Server Error',
                code: 500,
              })
            })
        }
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }
}

module.exports = new menuController()