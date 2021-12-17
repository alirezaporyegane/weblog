const mongoose = require('mongoose'),
slugger = require('mongoose-slugger-plugin'),
Schema = mongoose.Schema;

const PostCategories = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  metaTitle: {
    type: String
  },
  parentId: {
    type: String
  },
  metaDescription: {
    type: String
  },
  sortOrder: {
    type: String
  },
})

PostCategories.index({ slug: 1 }, { name: 'slug', unique: true })

const SluggerOptions = new slugger.SluggerOptions({
  slugPath: 'slug',
  generateFrom: 'name',
  index: 'slug'
})

PostCategories.plugin(slugger.plugin, SluggerOptions)

let postCategories = mongoose.model('PostCategories', PostCategories)

postCategories = slugger.wrap(postCategories)

module.exports = postCategories