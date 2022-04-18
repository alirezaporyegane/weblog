const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const ProductPackage = new Schema({
  name: {
    type: String,
    required: true
  },
  unitsQuantity: {
    type: Number,
    minlenght: 0,
    maxlenght: 2147483647
  },
  minOq: {
    type: Number,
    minlenght: 0,
    required: true
  },
  maxOq: {
    type: Number,
    minlenght: 0
  },
  default: {
    type: Boolean
  },
  sortOrder: {
    type: Number
  },
  productArticleId: {
    type: ObjectId,
    ref: 'ProductArticle'
  },
  salePlans: [
    {
      from: {
        type: Number,
        required: true
      },
      minOq: {
        type: Number,
        minlenght: 0
      },
      maxOq: {
        type: Number,
        minlenght: 0
      },
      unitDiscount: {
        type: Number,
        minlenght: 0
      },
      discount: {
        type: Number,
        required: true,
        minlenght: 0
      },
      unitDiscountPercent: {
        type: Number,
        minlenght: 0,
        maxlenght: 100
      },
      discountPercent: {
        type: Number,
        required: true,
        minlenght: 0,
        maxlenght: 100
      },
      unitPriceBeforeDiscount: {
        type: Number,
        minlenght: 0
      },
      priceBeforeDiscount: {
        type: Number,
        required: true,
        minlenght: 0
      },
      unitPriceAfterDiscount: {
        type: Number,
        minlenght: 0
      },
      priceAfterDiscount: {
        type: Number,
        minlenght: 0
      },
      dealName: {
        type: String
      },
      dealStartDate: {
        type: String
      },
      dealEndDate: {
        type: String
      },
      packageId: {
        type: ObjectId,
        ref: 'ProductPackage'
      }
    }
  ]
})

module.exports = mongoose.model('ProductPackage', ProductPackage)
