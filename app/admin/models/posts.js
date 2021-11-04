const mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const postsSchema = new Schema({
  title: {
    type: String
  },
  slug: {
    type: String
  },
  image: {
    type: String
  },
  header: {
    type: String
  },
  excerpt: {
    type: String
  },
  lead: {
    type: String
  },
  body: {
    type: String
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  featured: {
    type: Boolean
  },
  primaryCategoryId: {
    type: ObjectId,
    ref: 'PostCategories'
  },
  categoryIds: [Number],
  published: {
    type: String,
    default: new Date()
  }
})

module.exports = mongoose.model('Posts', postsSchema)