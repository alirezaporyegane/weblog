const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const productsSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    altTitle: {
      type: String
    },
    alert: {
      type: String
    },
    body: {
      type: String
    },
    excerpt: {
      type: String
    },
    header: {
      type: String
    },
    image: {
      type: String
    },
    otherImages: {
      type: String
    },
    auditComment: {
      type: String
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6]
    },
    saleable: {
      type: Boolean
    },
    tab1Body: {
      type: String
    },
    tab2Body: {
      type: String
    },
    tab3Body: {
      type: String
    },
    tab4Body: {
      type: String
    },
    tab5Body: {
      type: String
    },
    tab6Body: {
      type: String
    },
    logical: {
      type: Boolean
    },
    taxPercent: {
      type: Number
    },
    tollPercent: {
      type: Number
    },
    featured: {
      type: Boolean
    },
    commentEnabled: {
      type: Boolean
    },
    rateEnabled: {
      type: Boolean
    },
    android: {
      type: Boolean
    },
    ios: {
      type: Boolean
    },
    web: {
      type: Boolean
    },
    tags: {
      type: [String]
    },
    archive: {
      type: Boolean
    },
    metaDescription: {
      type: String
    },
    metaTitle: {
      type: String
    },
    redirect: {
      type: String
    },
    slug: {
      type: String
    },
    published: {
      type: String
    },
    categoriesId: [
      {
        type: ObjectId,
        ref: 'ProductCategories'
      }
    ],
    categories: [
      {
        _id: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        slug: {
          type: String
        },
        groupId: {
          type: ObjectId,
          ref: 'ProductGroups'
        },
        group: {
          _id: {
            type: String
          },
          name: {
            type: String
          },
          slug: {
            type: String
          }
        }
      }
    ],
    files: [
      {
        name: {
          type: String
        },
        file: {
          type: String
        },
        sortOrder: {
          type: Number
        }
      }
    ],
    fieldGroups: [
      {
        _id: {
          type: String,
          required: true
        },
        fields: [
          {
            _id: {
              type: String,
              required: true
            },
            value: {
              type: Object
            }
          }
        ]
      }
    ],
    brandId: {
      type: ObjectId,
      ref: 'Brand'
    },
    typeId: {
      type: ObjectId,
      ref: 'ProductSetType'
    },
    unitId: {
      type: ObjectId,
      ref: 'Unit'
    },
    relations: [
      {
        relationTypeId: {
          type: ObjectId,
          ref: 'ProductRelationTypes',
          required: true
        },
        side: {
          type: Number
        },
        productIds: [
          {
            type: ObjectId,
            ref: 'Product'
          }
        ]
      }
    ],
    userGroups: [
      {
        name: {
          type: String,
          required: true
        },
        sortOrder: {
          type: Number,
          required: true
        },
        saleLimit: {
          type: Number,
          required: true
        }
      }
    ],
    models: [
      {
        description: {
          type: String
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
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productsSchema)
