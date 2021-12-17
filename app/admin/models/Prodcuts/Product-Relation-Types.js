const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const productRelationTypesSchema = new Schema({
  primarySideName: {
    type: String,
    required: true
  },
  relatedSideName: {
    type: String,
    required: true
  },
  sortOrder: {
    type: Number
  }
})

module.exports = mongoose.model('ProductRelationTypes', productRelationTypesSchema)