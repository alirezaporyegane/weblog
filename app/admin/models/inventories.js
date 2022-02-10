const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const inventoriesSchema = new Schema({
  name: {
    type: String,
    quired: true,
  },
  code: {
    type: String,
  },
  sortOrder: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
  },
})

module.exports = mongoose.model('Inventories', inventoriesSchema)
