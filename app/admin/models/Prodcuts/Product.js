const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const productsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  altTitle: {
    type: String
  },
  alert: {
    type: String
  },
  body: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  excerpt: {
    type: String
  },
  header: {
    type: String
  },
  image: {
    type: String
  },
  saleable: {
    type: Boolean
  },
  featured: {
    type: Boolean
  },
  commentEnabled: {
    type: Boolean
  },
  rateEnabled: {
    type: Boolean
  },
  tegs: {
    type: [String]
  },
  otherImages: {
    type: [String]
  },
  brand: {
    type: ObjectId,
    ref: 'Brand'
  },
  type: {
    type: ObjectId,
    ref: 'ProductSetType'
  },
  status: {
    type: Number,
  },
  // models: [modelSchema]
}, { timestamps: true })


const modelSchema = new Schema({
  description: {
    type: String
  }
})

module.exports = mongoose.model('Product', productsSchema)