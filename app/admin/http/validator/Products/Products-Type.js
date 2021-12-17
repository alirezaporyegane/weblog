const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

function ValidateProductType (data) {
  const Schema = joi.object({
    title: joi.string().required(),
    slug: joi.string().allow(null),
    active: joi.boolean(),
    sortOrder: joi.number(),
    typeId: joi.objectId().allow(null),
    size: joi.array().items(joi.object({
      title: joi.string().required().max(150),
      altTitle: joi.string().max(150).allow(null),
      image: joi.string().allow(null),
      sortOrder: joi.number().integer().required(),
      active: joi.boolean()
    })),
    color: joi.array().items(joi.object({
      title: joi.string().required().max(150),
      altTitle: joi.string().max(150).allow(null),
      color: joi.string().required(),
      image: joi.string().allow(null),
      sortOrder: joi.number().integer().required(),
      active: joi.boolean()
    })),
    guarantee: joi.array().items(joi.object({
      title: joi.string().required().max(150),
      altTitle: joi.string().max(150).allow(null),
      image: joi.string().allow(null),
      sortOrder: joi.number().integer().required(),
      active: joi.boolean()
    })),
    fieldTypeGroups: joi.array().items(joi.object({
      name: joi.string().required().max(150),
      displayName: joi.string().allow(null),
      type: joi.number().integer().allow(null),
      viewData: joi.string().allow(null),
      required: joi.boolean(),
      filterable: joi.boolean(),
      featured: joi.boolean(),
      fieldTypeOn: joi.number(),
      trueLabel: joi.string().allow(null),
      falseLabel: joi.string().allow(null),
      unit: joi.string().allow(null),
      min: joi.string().allow(null),
      max: joi.string().allow(null),
      precision: joi.string().allow(null),
      regex: joi.string().allow(null),
      options: joi.array().items(joi.object({
        value: joi.number().integer(),
        text: joi.string().allow(null)
      }))
    })),
    unit: joi.objectId().allow(null),
    r1: joi.string().allow(null),
    r2: joi.string().allow(null),
    r3: joi.string().allow(null),
    r4: joi.string().allow(null),
    r5: joi.string().allow(null),
    r6: joi.string().allow(null),
    tab1: joi.string().allow(null),
    tab2: joi.string().allow(null),
    tab3: joi.string().allow(null),
    tab4: joi.string().allow(null),
    tab5: joi.string().allow(null),
    tab6: joi.string().allow(null),
  })
  return Schema.validate(data)
}

module.exports = {
  ValidateProductType
}



