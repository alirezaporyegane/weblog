const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const productsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    altTitle: {
      type: String,
    },
    alert: {
      type: String,
    },
    body: {
      type: String,
    },
    excerpt: {
      type: String,
    },
    header: {
      type: String,
    },
    image: {
      type: String,
    },
    otherImages: {
      type: String,
    },
    auditComment: {
      type: Boolean,
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6],
    },
    saleable: {
      type: Boolean,
    },
    tab1Body: {
      type: String,
    },
    tab2Body: {
      type: String,
    },
    tab3Body: {
      type: String,
    },
    tab4Body: {
      type: String,
    },
    tab5Body: {
      type: String,
    },
    tab6Body: {
      type: String,
    },
    logical: {
      type: Boolean,
    },
    taxPercent: {
      type: Number,
    },
    tollPercent: {
      type: Number,
    },
    featured: {
      type: Boolean,
    },
    commentEnabled: {
      type: Boolean,
    },
    rateEnabled: {
      type: Boolean,
    },
    android: {
      type: Boolean,
    },
    ios: {
      type: Boolean,
    },
    web: {
      type: Boolean,
    },
    tegs: {
      type: [String],
    },
    archive: {
      type: Boolean,
    },
    metaDescription: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    redirect: {
      type: String,
    },
    slug: {
      type: String,
    },
    fieldGroups: [
      {
        _id: {
          type: String,
          required: true,
        },
        fields: [
          {
            _id: {
              type: String,
              required: true,
            },
            value: {
              type: Object,
            },
          },
        ],
      },
    ],
    brand: {
      type: ObjectId,
      ref: 'Brand',
    },
    type: {
      type: ObjectId,
      ref: 'ProductSetType',
    },
    userGroups: [
      {
        name: {
          type: String,
          required: true,
        },
        sortOrder: {
          type: Number,
          required: true,
        },
        saleLimit: {
          type: Number,
          required: true,
        },
      },
    ],
    models: [
      {
        code: {
          type: String,
        },
        description: {
          type: String,
        },
        default: {
          type: Boolean,
        },
        sortOrder: {
          type: Number,
        },
        articles: [
          {
            stock: {
              type: Number,
            },
            default: {
              type: Boolean,
            },
            availabilityStatus: {
              type: Number,
              enum: [0, 1, 2, 3, 4],
            },
            sortOrder: {
              type: Number,
            },
            salePlans: [
              {
                from: {
                  type: Number,
                  required: true,
                },
                discount: {
                  type: Number,
                  required: true,
                },
                discountPercent: {
                  type: Number,
                  required: true,
                },
                priceBeforeDiscount: {
                  type: Number,
                  required: true,
                },
                priceAfterDiscount: {
                  type: Number,
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productsSchema)
