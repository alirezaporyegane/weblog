const { modules } = require('../models/Lic');

class Modules {
  getLicence (req, res) {
    try {
      res.status(200).json(modules)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new Modules()