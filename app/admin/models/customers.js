const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customeSchema = new Schema({
  fristName: {
    type: String,
    required: true,
  },
  latsName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Customer', customeSchema)
