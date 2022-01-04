const mongoose = require('mongoose'),
slugger = require('mongoose-slugger-plugin'),
Schema = mongoose.Schema;

const pagesSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Home Page'
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  slug: {
    type: String
  },
  layout: {
    type: String
  },
  area1: [Schema.Types.Mixed],
  area2: [Schema.Types.Mixed],
  area3: [Schema.Types.Mixed],
  area4: [Schema.Types.Mixed],
  area5: [Schema.Types.Mixed],
  area6: [Schema.Types.Mixed]
}, { timestamps: true })


pagesSchema.index({ slug: 1 }, { name: 'slug', unique: true })

const slggerOption = new slugger.SluggerOptions({
  slugPath: 'slug',
  generateFrom: 'title',
  index: 'slug'
})

pagesSchema.plugin(slugger.plugin, slggerOption)

let homePage = mongoose.model('HomePage', pagesSchema)

homePage = slugger.wrap(homePage)

module.exports = homePage
