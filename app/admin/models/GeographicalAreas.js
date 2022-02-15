const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const geographicalAreasSchema = new Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  sortOrder: {
    type: Number,
  },
  coordinates: {
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
  cities: [
    {
      _id: {
        type: Number,
      },
      name: {
        type: String,
      },
      sortOrder: {
        type: String,
      },
      coordinates: {
        lat: {
          type: Number,
        },
        lon: {
          type: Number,
        },
      },
      active: {
        type: Boolean,
      },
    },
  ],
  countryId: {
    type: Number,
  },
  country: {
    _id: {
      type: Number,
    },
    name: {
      type: String,
    },
    sortOrder: {
      type: String,
    },
  },
})

module.exports = mongoose.model('GeographicalAreas', geographicalAreasSchema)
