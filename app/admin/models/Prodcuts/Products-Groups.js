const mongoose = require('mongoose'),
  slugger = require('mongoose-slugger-plugin'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const categoriesSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
  image: {
    type: String,
  },
  sortOrder: {
    type: Number,
  },
  metaTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  parentId: {
    type: String,
  },
  altName: {
    type: String,
  },
  tags: {
    type: [String],
  },
  otherNames: {
    type: [String],
  },
  typeId: {
    type: ObjectId,
    ref: 'ProductSetType',
  },
  active: {
    type: Boolean,
  },
  groupId: {
    type: ObjectId,
    ref: 'ProductGroups',
  },
})

const productsGroupsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  metaTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  sortOrder: {
    type: Number,
  },
  categories: [categoriesSchema],
})

module.exports = mongoose.model('ProductGroups', productsGroupsSchema)
