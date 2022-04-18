const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const ProductModelsSchema = new Schema({
  description: {
    type: String,
    maxlength: 500
  },
  colorId: {
    type: String
  },
  sizeId: {
    type: String
  },
  guaranteeId: {
    type: String
  },
  default: {
    type: Boolean
  },
  sortOrder: {
    type: Number
  },
  color: {
    name: {
      type: String
    },
    code: {
      type: String
    },
    _id: {
      type: String
    }
  },
  size: {
    name: {
      type: String
    },
    _id: {
      type: String
    }
  },
  guarantee: {
    name: {
      type: String
    },
    _id: {
      type: String
    }
  },
  productsId: {
    type: ObjectId,
    ref: 'Product'
  },
  articles: [
    {
      stock: {
        type: Number,
        minlenght: 0,
        maxlenght: 99999999
      },
      availabilityStatus: {
        type: Number,
        enum: [0, 1, 2, 3]
      },
      currencyId: {
        type: ObjectId,
        ref: 'Currencies',
        required: true
      },
      inventoryId: {
        type: ObjectId,
        ref: 'Inventories'
      },
      notifyLowStock: {
        type: Number,
        minlenght: 0,
        maxlenght: 99999
      },
      sellerId: {
        type: ObjectId,
        ref: 'Account'
      },
      approved: {
        type: Boolean
      },
      sortOrder: {
        type: Number
      },
      default: {
        type: Boolean
      },
      salePlans: [
        {
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
          productArticleId: {
            type: ObjectId,
            ref: 'ProductArticle'
          },
          priceAfterDiscount: {
            type: Number,
            minlenght: 0
          }
        }
      ],
      packages: [
        {
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
            required: true
          },
          maxOq: {
            type: Number
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
        }
      ],
      productModelId: {
        type: ObjectId,
        ref: 'ProductModel'
      }
    }
  ]
})

module.exports = mongoose.model('ProductModels', ProductModelsSchema)
