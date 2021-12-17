const _ = require('lodash'),
Pages = require('../../models/Pages');

class pagescontroller {
  async getone (req, res) {
    Pages.find()
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

  async create (req, res) {
    Pages.create(_.pick(req.body, ['title', 'metaTitle', 'metaDescription', 'slug', 'layout', 'area1']))
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      })
  }

  async update (req, res) {
    Pages.create({}, _.pick(req.body, ['title', 'altTitle', 'color', 'logo', 'logoAlt', 'logoAndroid', 'favIcon', 'noImage', 'whatsapp', 'instagram'
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

module.exports = new pagescontroller()