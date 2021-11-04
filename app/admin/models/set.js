const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const setSchema = new Schema({
  name: {
    type: String
  },
  familyName: {
    type: String
  }
})

module.exports = mongoose.model('set' , setSchema)