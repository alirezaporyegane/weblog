const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
})

const orderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  quntity: {
    type: Number,
    required: true,
  },
  commnets: {
    type: [CommentSchema],
    required: true,
  },
})

module.exports.Order = mongoose.model('Order', orderSchema)
