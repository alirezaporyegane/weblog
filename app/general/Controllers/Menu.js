const Menus = require('../../admin/models/menu');

class Menu {
  async getAll (req, res) {
    Menus.find().sort({ sortOrder: 1 })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }
}

module.exports = new Menu()