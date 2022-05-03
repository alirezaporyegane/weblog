const GeographicalAreasModel = require('../../models/GeographicalAreas')

class GeographicalAreas {
  async getAll(req, res) {
    try {
      const skip = req.query.skip ? parseInt(req.query.skip) : ''
      const limit = req.query.limit ? parseInt(req.query.limit) : ''
      const include = req.query.include ? req.query.include : ''
      const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''

      const filter = {}
      if (req.query.name) filter.name = { $regex: req.query.name }
      if (req.query.sortOrder) filter.sortOrder = { $regex: req.query.sortOrder }
      if (req.query.country) filter['country.name'] = { $regex: req.query.country }
      if (req.query.city) filter['cities.name'] = { $regex: req.query.city }

      const result = await GeographicalAreasModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select(include)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getCount(req, res) {
    const filter = {}
    if (req.query.name) filter.name = { $regex: req.query.name }
    if (req.query.sortOrder) filter.sortOrder = { $regex: req.query.sortOrder }
    if (req.query.country) filter['country.name'] = { $regex: req.query.country }
    if (req.query.city) filter['cities.name'] = { $regex: req.query.city }

    try {
      const result = await GeographicalAreasModel.find(filter).countDocuments()

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getInfo(req, res) {
    try {
      const filter = []
      if (typeof req.query.keyword === 'object') {
        const ids = req.query.keyword.map((id) => mongoose.Types.ObjectId(id))
        filter.push({ $match: { _id: { $in: ids } } })
      } else if (req.query.keyword && mongoose.isValidObjectId(req.query.keyword)) {
        filter.push({ $match: { _id: mongoose.Types.ObjectId(req.query.keyword) } })
      } else if (req.query.keyword) {
        filter.push({ $match: { name: { $regex: req.query.keyword } } })
      }

      if (req.query.skip) filter.push({ $skip: parseInt(req.query.skip) })
      if (req.query.limit) filter.push({ $limit: parseInt(req.query.limit) })

      const items = await GeographicalAreasModel.aggregate([
        { $sort: { name: 1 } },
        ...filter,
        {
          $project: {
            _id: 0,
            text: '$name',
            value: '$_id'
          }
        }
      ])

      const count = await GeographicalAreasModel.find().countDocuments()

      res.status(200).json({ items, count })
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new GeographicalAreas()
