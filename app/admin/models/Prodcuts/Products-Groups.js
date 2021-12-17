const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
slugger = require('mongoose-slugger-plugin'),
ObjectId = Schema.ObjectId;

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  slug: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  sortOrder: {
    type: Number
  },
  metaTitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    minlength: 50,
    trim: true
  },
  parentId: {
    type: String
  },
  altName: {
    type: String,
    trim: true
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
    type: String,
    required: true,
    maxlength: 150,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    trim: true
  },
  metaTitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true,
    minlength: 50
  },
  sortOrder: {
    type: Number
  },
  categories: [categoriesSchema]
})

productsGroupsSchema.index({ slug: 1 }, { name: 'slug', unique: true })

const slggerOption = new slugger.SluggerOptions({
  slugPath: 'slug',
  generateFrom: 'name',
  index: 'slug'
})

productsGroupsSchema.plugin(slugger.plugin, slggerOption)

let productsGroups = mongoose.model('ProductGroup', productsGroupsSchema)

productsGroups = slugger.wrap(productsGroups)

module.exports = productsGroups