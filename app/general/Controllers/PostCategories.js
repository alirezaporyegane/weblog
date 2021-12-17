const PostCategories = require('../../admin/models/Post/Post-Categories');

class PostCategoriesModel {
  async getAll (req, res) {
    const parentId = req.query.parentId ? req.query.parentId : null
    const ids = req.body.ids ? req.body.ids : null

    if(parentId) {
      PostCategories.find()
      .where("parentId").eq(parentId)
      .sort({ sortOrder: 1 })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(() => {
          res.status(500).json({
            msg: 'Internal Server Error',
            code: 500
          })
        })
    } else {
      PostCategories.find()
      .sort({ sortOrder: 1 })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(() => {
          res.status(500).json({
            msg: 'Internal Server Error',
            code: 500
          })
        })
    }

  }

  async getBySlug (req, res) {
    const slug = req.params.slug

    PostCategories.findOne({ slug: slug })
      .sort({ sortOrder: 1 })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(() => {
          res.status(500).json({
            msg: 'Internal Server Error',
            code: 500
          })
        })
  }
}

module.exports = new PostCategoriesModel()