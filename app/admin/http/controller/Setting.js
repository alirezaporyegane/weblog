const _ = require('lodash'),
Setting = require('../../models/setting');

class setting {
  async getAll (req, res) {
    Setting.find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Get has Failed',
          error: err,
          success: false
        })
      })
  }

  async update (req, res) {
    Setting.create({title: req.body.title}, _.pick(req.body, ['title', 'altTitle', 'color', 'logo', 'logoAlt', 'logoAndroid', 'favIcon', 'noImage', 'whatsapp', 'instagram'
      ,'telegram', 'twitter', 'youtube', 'aparat', 'facebook', 'email', 'linkedin', 'phoneNumber', 'address']), {new: true, useFindAndModify: false},)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }
}

module.exports = new setting()