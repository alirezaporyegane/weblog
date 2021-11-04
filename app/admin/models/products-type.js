const mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;


const colorSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  altTitle: {
    type: String
  },
  color: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  sortOrder: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean
  },
})

const sizeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  altTitle: {
    type: String
  },
  sortOrder: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  active: {
    type: Boolean
  },
})

const guaranteeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  altTitle: {
    type: String
  },
  sortOrder: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  active: {
    type: Boolean
  },
})

const optionsSchema = new Schema({
  value: {
    type: Number
  },
  text: {
    type: String
  }
})

const fieldTypes = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  type: {
    type: Number
  },
  viewData: {
    type: String
  },
  required: {
    type: Boolean
  },
  filterable: {
    type: Boolean
  },
  featured: {
    type: Boolean
  },
  fieldTypeOn: {
    type: Number
  },
  trueLabel: {
    type: String
  },
  falseLabel : {
    type: String
  },
  unit: {
    type: String
  },
  min: {
    type: String
  },
  max: {
    type: String
  },
  precision: {
    type: String
  },
  regex: {
    type: String
  },
  options : [optionsSchema]
})

const fieldTypeGroups = new Schema({
  name: {
    type: String,
    required: true
  },
  fieldTypes: [fieldTypes]
})

const productTypeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  unit: {
    type: ObjectId,
    ref: 'Unit'
  },
  active: {
    type: Boolean
  },
  sortOrder: {
    type: Number,
    required: true
  },
  typeId: {
    type: ObjectId,
    ref: 'ProductSetType'
  },
  color: [colorSchema],
  size: [sizeSchema],
  guarantee: [guaranteeSchema],
  fieldTypeGroups: [fieldTypeGroups],
  r1: {
    type: String
  },
  r2: {
    type: String
  },
  r3: {
    type: String
  },
  r4: {
    type: String
  },
  r5: {
    type: String
  },
  r6: {
    type: String
  },
  tab1: {
    type: String
  },
  tab2: {
    type: String
  },
  tab3: {
    type: String
  },
  tab4: {
    type: String
  },
  tab5: {
    type: String
  },
  tab6: {
    type: String
  }
})

module.exports = mongoose.model('ProductSetType', productTypeSchema)