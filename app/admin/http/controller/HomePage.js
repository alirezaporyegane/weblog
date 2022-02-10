const _ = require('lodash'),
  HomePage = require('../../models/Pages'),
  Post = require('../../models/Post/Posts')

class pagescontroller {
  async getHomePage(req, res) {
    HomePage.findOne()
      .then((result) => {
        let data = {}

        if (result.area1) {
          result.area1.forEach(async (area) => {
            if (area.type === 'post') {
              const post = await Post.find()
              area.items = post

              console.log(area)

              data = { ...area }
            }
            data = { ...area }
          })
        }

        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({
          msg: 'Get has Failed',
          error: err,
          success: false,
        })
      })
  }

  async updateHomePage(req, res) {
    try {
      const haveHomePage = await HomePage.find()

      if (haveHomePage.length === 0) {
        const result = await HomePage.create(req.body)

        console.log(result)

        res.status(200).json('ok')
        // switch (result.type) {
        //   case value:

        //     break;

        //   default:
        //     break;
        // }
      } else {
      }
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }
}

module.exports = new pagescontroller()
