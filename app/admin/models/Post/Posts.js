const mongoose = require('mongoose'),
slugger = require('mongoose-slugger-plugin'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const postsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
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
    ref: 'PostCategories',
    required: true
  },
  categoryIds: [{
    type: ObjectId,
    ref: 'PostCategories'
  }],
  published: {
    type: String,
    default: new Date()
  }
})

postsSchema.index({ slug: 1}, { name: 'slug', unique: true })


const sluggerOptions = new slugger.SluggerOptions({
  slugPath: 'slug',
  generateFrom: 'title',
  index: 'slug'
})

postsSchema.plugin(slugger.plugin, sluggerOptions)

let Posts = mongoose.model('Posts', postsSchema)

Posts = slugger.wrap(Posts);

module.exports = Posts