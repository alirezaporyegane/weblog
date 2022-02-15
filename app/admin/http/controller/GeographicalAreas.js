const GeographicalAreasModel = require('../../models/GeographicalAreas')

class GeographicalAreas {
  async getAll(req, res) {
    try {
      const skip = req.query.skip ? parseInt(req.query.skip) : ''
      const limit = req.query.limit ? parseInt(req.query.limit) : ''
      const include = req.query.include ? req.query.include : ''
      const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

      const result = await GeographicalAreasModel.find()
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select(include)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async getCount(req, res) {
    const filter = {}

    try {
      const result = await GeographicalAreasModel.find(filter).countDocuments()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }
}

module.exports = new GeographicalAreas()
