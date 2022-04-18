const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const categoriesSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 150
  },
  slug: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  sortOrder: {
    type: Number
  },
  metaTitle: {
    type: String
  },
  description: {
    type: String
  },
  metaDescription: {
    type: String,
    minlength: 50
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
  typeId: {
    type: ObjectId,
    ref: 'ProductSetType'
  },
  active: {
    type: Boolean
  },
  groupId: {
    type: ObjectId,
    ref: 'ProductGroups',
    required: true
  },
  group: {
    _id: {
      type: String
    },
    name: {
      type: String
    },
    slug: {
      type: String
    }
  }
})

const productsGroupsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  image: {
    type: String
  },
  slug: {
    type: String,
    required: true
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
    type: Number
  },
  categories: [categoriesSchema]
})

mongoose.model('ProductCategories', productsGroupsSchema)
module.exports = mongoose.model('ProductGroups', productsGroupsSchema)
