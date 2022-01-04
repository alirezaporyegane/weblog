const mongoose = require('mongoose'),
slugger = require('mongoose-slugger-plugin'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const brandSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlenght: 250
  },
  altName: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sortOrder: {
    type: Number,
    required: true
  },
  tags: {
    type: [String],
  },
  mataTitle: {
    type: String,
  },
  typeId: {
    type: ObjectId,
    ref: 'ProductSetType'
  },
  metaDescription: {
    type: String,
  },
  otherName: {
    type: [String]
  },
  body: {
    type: String
  },
  image: String
},  { timestamps: true })

brandSchema.index({ slug: 1 }, { name: 'slug', unique: true })

const slggerOption = new slugger.SluggerOptions({
  slugPath: 'slug',
  generateFrom: 'title',
  index: 'slug'
})

brandSchema.plugin(slugger.plugin, slggerOption)

let brands = mongoose.model('Brand', brandSchema)

brands = slugger.wrap(brands)

module.exports = brands