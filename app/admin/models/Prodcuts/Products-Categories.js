const mongoose = require('mongoose'),
slugger = require('mongoose-slugger-plugin'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const productsCategoriesSchema = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  slug: {
    type: String
  },
  image: {
    type: String
  },
  sortOrder: {
    type: String
  },
  metaTitle: {
    type: String
  },
  description: {
    type: String
  },
  metaDescription: {
    type: String
  },
  parentId: {
    type: String
  },
  altName: {
    type: String
  },
  tags: {
    type: [String]
  },
  otherNames: {
    type: [String]
  },
  productType: {
    type: ObjectId,
    ref: 'ProductSetType'
  },
  active: {
    type: Boolean
  }
}, { _id: false })

module.exports = mongoose.model('ProductsCategories', productsCategoriesSchema)