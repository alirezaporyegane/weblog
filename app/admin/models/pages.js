const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const area1Scheme = new Schema({
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
  "if(type === 'text')": { 
    image: {
      type: String
    },
    body: {
      type: String
    }
  },
}, { _id: false })

const pagesSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Home'
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
  area1: [area1Scheme]
})


module.exports = mongoose.model('Pages', pagesSchema)