const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const currenciesSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  symbol: {
    type: String
  },
  image: {
    type: String
  },
  precision: {
    type: Number
  },
  sortOrder: {
    type: Number
  },
  active: {
    type: Boolean
  }
})

module.exports = mongoose.model('Currencies', currenciesSchema)