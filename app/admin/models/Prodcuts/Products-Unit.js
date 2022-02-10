const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const unitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sortOrder: {
    type: Number,
    required: true,
  },
  precision: {
    type: Number,
  },
  active: {
    type: Boolean,
  },
})

module.exports = mongoose.model('Unit', unitSchema)
