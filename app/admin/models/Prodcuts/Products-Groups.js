const mongoose = require('mongoose'),
slugger = require('mongoose-slugger-plugin'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const categoriesSchema = new Schema({
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
})

const productsGroupsSchema = new Schema({
  name: {
    type: String
  },
  color: {
    type: String
  },
  image: {
    type: String
  },
  slug: {
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
  sortOrder: {
    type: String
  },
  categories: [categoriesSchema]
})


module.exports = mongoose.model('ProductGroups', productsGroupsSchema)