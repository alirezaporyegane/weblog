const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const fileSchema = new Schema({
  image: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Files', fileSchema)