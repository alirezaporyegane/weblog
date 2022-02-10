const mongoose = require('mongoose'),
  slugger = require('mongoose-slugger-plugin'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const colorSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  altTitle: {
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  sortOrder: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
  },
})

const sizeSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  altTitle: {
    type: String,
  },
  sortOrder: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  active: {
    type: Boolean,
  },
})

const guaranteeSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  altTitle: {
    type: String,
  },
  sortOrder: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  active: {
    type: Boolean,
  },
})

const optionsSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
  },
  text: {
    type: String,
  },
})

const fieldTypes = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  viewData: {
    type: String,
  },
  required: {
    type: Boolean,
  },
  filterable: {
    type: Boolean,
  },
  featured: {
    type: Boolean,
  },
  fieldTypeOn: {
    type: Number,
  },
  defaultValue: {
    type: String,
  },
  trueLabel: {
    type: String,
  },
  falseLabel: {
    type: String,
  },
  unit: {
    type: String,
  },
  min: {
    type: String,
  },
  max: {
    type: String,
  },
  precision: {
    type: Number,
  },
  regex: {
    type: String,
  },
  options: [optionsSchema],
})

const fieldTypeGroups = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fieldTypes: [fieldTypes],
})

const productTypeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  unit: {
    type: ObjectId,
    ref: 'Unit',
  },
  active: {
    type: Boolean,
  },
  sortOrder: {
    type: Number,
    required: true,
  },
  typeId: {
    type: ObjectId,
    ref: 'ProductSetType',
  },
  color: [colorSchema],
  size: [sizeSchema],
  guarantee: [guaranteeSchema],
  fieldTypeGroups: [fieldTypeGroups],
  r1: {
    type: String,
  },
  r2: {
    type: String,
  },
  r3: {
    type: String,
  },
  r4: {
    type: String,
  },
  r5: {
    type: String,
  },
  r6: {
    type: String,
  },
  tab1: {
    type: String,
  },
  tab2: {
    type: String,
  },
  tab3: {
    type: String,
  },
  tab4: {
    type: String,
  },
  tab5: {
    type: String,
  },
  tab6: {
    type: String,
  },
})

productTypeSchema.index({ slug: 1 }, { name: 'slug', unique: true })

const optionSlugger = new slugger.SluggerOptions({
  slugPath: 'slug',
  generateFrom: 'title',
  index: 'slug',
})

productTypeSchema.plugin(slugger.plugin, optionSlugger)

let productsType = mongoose.model('ProductSetType', productTypeSchema)

productsType = slugger.wrap(productsType)

module.exports = productsType
