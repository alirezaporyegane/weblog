const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const productsCategoriesSchema = new Schema({
  name: {
    type: String,
    required: true
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
    minlength: 150
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

module.exports = mongoose.model('ProductsCategories', productsCategoriesSchema)
