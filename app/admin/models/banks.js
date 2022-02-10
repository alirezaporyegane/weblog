const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const banksSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  active: {
    type: Boolean,
  },
})

module.exports = mongoose.model('Banks', banksSchema)
