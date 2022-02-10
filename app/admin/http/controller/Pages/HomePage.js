const _ = require('lodash'),
  HomePage = require('../../../models/Pages/Home-Page')

class HomePagecontroller {
  async getHomePage(req, res) {
    try {
      const result = await HomePage.findOne()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async updateHomePage(req, res) {
    try {
      const haveHomePage = await HomePage.find()

      if (haveHomePage.length === 0) {
        const result = await HomePage.create(req.body)

        res.status(200).json(result)
      } else {
        await HomePage.deleteMany({})

        const result = await HomePage.create(req.body)

        res.status(200).json(result)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }
}

module.exports = new HomePagecontroller()
