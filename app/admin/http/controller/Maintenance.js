const mongoose = require('mongoose'),
  _ = require('lodash'),
  GeographicalAreasModel = require('../../models/GeographicalAreas'),
  city = require('../../models/Cities/city.json'),
  country = require('../../models/Cities/country.json'),
  province = require('../../models/Cities/province.json')

class Maintenance {
  async seedLoaction(req, res) {
    try {
      await Promise.resolve(
        city.forEach((c, index) => {
          c._id = index + 1
          c.sortOrder = index + 1
          c.coordinates = {
            lat: c.lat,
            lon: c.lon
          }
          c.active = true
          delete c.lat
          delete c.lon
          delete c.id
        })
      )

      await Promise.resolve(
        country.forEach((con, index) => {
          con._id = con.id
          con.sortOrder = index + 1
          con.active = true
          con.coordinates = {
            lat: con.lat,
            lon: con.lon
          }
          delete con.lat
          delete con.lon
          delete con.id
        })
      )

      await Promise.resolve(
        province.forEach((p, index) => {
          p._id = p.id
          p.sortOrder = index + 1
          p.coordinates = {
            lat: p.lat,
            lon: p.lon
          }
          country.forEach((i) => {
            p.country = i
          })
          p.active = true
          p.cities = city.filter((c) => c.province === p.id)
          country.forEach((con) => {
            p.countryId = con.id
          })
          delete p.lat
          delete p.lon
          delete p.id
        })
      )

      GeographicalAreasModel.deleteMany({}).then(() => {
        GeographicalAreasModel.insertMany(province).then(() => {
          res.status(200).json({
            success: false
          })
        })
      })
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new Maintenance()
