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
  header: {
    type: String
  },
  image: {
    type: String
  },
  otherImages: {
    type: [String]
  },
  brand: {
    type: ObjectId,
    ref: 'Brand'
  },
  typeId: {
    type: ObjectId,
    ref: 'ProductSetType'
  },
  status: {
    type: Number,
  }
}, { timestamps: true })

module.exports = mongoose.model('Product', productsSchema)