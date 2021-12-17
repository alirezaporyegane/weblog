const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const rangesSchema = new Schema({
  from: {
    type: Number
  },
  fee: {
    type: Number
  }
});

const DeliveryMethodsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  payOnDelivery: {
    type: Boolean
  },
  hideFee: {
    type: Boolean
  },
  sortOrder: {
    type: Number
  },
  active: {
    type: Boolean
  },
  rangesFeeType: {
    type: Number,
    enum: [0, 1]
  },
  calculationMethod: {
    type: Number,
    enum: [0, 1]
  },
  baseFee: {
    type: Number
  },
  ranges: [rangesSchema]
});

module.exports = mongoose.model('DeliveryMethods', DeliveryMethodsSchema)