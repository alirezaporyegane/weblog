const mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const postCategories = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  sortOrder: {
    type: String
  },
})

module.exports = mongoose.model('PostCategories', postCategories)