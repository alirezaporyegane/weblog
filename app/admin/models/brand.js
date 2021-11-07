const mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId

const brandSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  altName: {
    type: String,
  },
  slug: {
    type: String,
    required: true
  },
  sortOrder: {
    type: Number,
    required: true
  },
  tags: {
    type: [String],
  },
  mataTitle: {
    type: String,
  },
  typeId: {
    type: ObjectId,
    ref: 'ProductSetType'
  },
  metaDescription: {
    type: String,
  },
  otherName: {
    type: [String]
  },
  body: {
    type: String
  },
  image: String
},  { timestamps: true })

module.exports = mongoose.model('Brand', brandSchema)