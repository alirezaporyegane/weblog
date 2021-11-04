const  mongoose  = require('mongoose'),
Set = require('../../models/set'),
_ = require('lodash')

class menuController {
  async getAll (req, res) {
    Set.find()
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
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({
      msg: 'id is not valid'
    })

    Set.bulkWrite({ $set: _.pick(req.body, ['name', 'familyName'])})
        .then(result => {
          _.pick(result, ['name', 'familyName'])
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
      })
  }
}

module.exports = new menuController()