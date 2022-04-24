const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const banksSchema = new Schema({
  name: {
    type: String,
    maxlength: 250,
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
