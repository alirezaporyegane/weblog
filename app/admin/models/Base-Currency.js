const mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const baseCurrencySchema = new Schema({
  baseId: {
    type: ObjectId,
    ref: 'Currencies'
  },
  displayId: {
    type: ObjectId,
    ref: 'Currencies'
  },
  fiscalId: {
    type: ObjectId,
    ref: 'Currencies'
  }
})

module.exports = mongoose.model('baseCurrency', baseCurrencySchema)