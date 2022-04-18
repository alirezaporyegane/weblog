const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const ProductSalePlans = new Schema({
  from: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true,
    minlenght: 0
  },
  discountPercent: {
    type: Number,
    required: true,
    minlenght: 0,
    maxlenght: 100
  },
  priceBeforeDiscount: {
    type: Number,
    required: true,
    minlenght: 0
  },
  priceAfterDiscount: {
    type: Number,
    minlenght: 0
  },
  productArticleId: {
    type: ObjectId,
    ref: 'ProductArticle'
  }
})

module.exports = mongoose.model('ProductSalePlans', ProductSalePlans)
