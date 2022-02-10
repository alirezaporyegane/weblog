const PostCategoriesModel = require('../../../models/Post/Post-Categories')

class PostCategories {
  async getAll(req, res) {
    PostCategoriesModel.find()
      .sort({ sortOrder: 1 })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }

  async update(req, res) {
    PostCategoriesModel.find()
      .then((data) => {
        if (data.length > 0) {
          PostCategoriesModel.deleteMany({})
            .then(() => {
              PostCategoriesModel.insertMany(req.body)
                .then((result) => {
                  res.status(200).json(result)
                })
                .catch(() => {
                  res.status(500).json({
                    msg: 'Internal Server Error',
                    code: 500,
                  })
                })
            })
            .catch(() => {
              res.status(500).json({
                msg: 'Internal Server Error',
                code: 500,
              })
            })
        } else {
          PostCategoriesModel.insertMany(req.body)
            .then((result) => {
              res.status(200).json(result)
            })
            .catch((err) => {
              console.log(err)
              res.status(500).json({
                msg: 'Internal Server Error',
                code: 500,
              })
            })
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500,
        })
      })
  }
}

module.exports = new PostCategories()
