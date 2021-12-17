const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const itemsSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  video: {
    type: String
  },
  url: {
    type: String
  },
  viewData: {
    type: String
  },
  icon: {
    type: String
  },
  sortOrder: {
    type: Number
  }
})

const areaScheme = new Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  url: {
    type: String
  },
  viewData: {
    type: String
  },
  view: {
    type: String
  },
  availability: {
    type: String
  },
  brandId: {
    type: String
  },
  categoryId: {
    type: String
  },
  featuredOnly: {
    type: String
  },
  poster: {
    type: String
  },
  autoPlay: {
    type: Boolean
  },
  component: {
    type: String
  },
  componentData: {
    type: String
  },
  body: {
    type: String
  },
  date: {
    type: String,
  },
  letters: {
    type: Boolean
  },
  showDate: {
    type: Boolean
  },
  tag: {
    type: String
  },
  buttonLabel: {
    type: String
  },
  phoneNumberEnabled: {
    type: Boolean
  },
  emailEnabled: {
    type: String
  },
  showTime: {
    type: Boolean
  },
  tags: {
    type: [String]
  },
  count: {
    type: Number
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  items: [itemsSchema]
}, { _id: false })

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
  area1: [areaScheme],
  area2: [areaScheme],
  area3: [areaScheme],
  area4: [areaScheme],
  area5: [areaScheme],
  area6: [areaScheme]
}, { timestamps: true })


module.exports = mongoose.model('Pages', pagesSchema)