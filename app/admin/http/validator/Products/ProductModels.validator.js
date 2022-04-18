const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

function productModelsValidator(data) {
  const schema = joi.object({
    description: joi.string().max(500).allow(null),
    colorId: joi.string().allow(null),
    sizeId: joi.string().allow(null),
    guaranteeId: joi.string().allow(null),
    default: joi.boolean(),
    sortOrder: joi.number().integer(),
    productsId: joi.objectId(),
    color: joi
      .object({
        name: joi.string(),
        code: joi.string(),
        _id: joi.string()
      })
      .allow(null),
    size: joi
      .object({
        name: joi.string(),
        _id: joi.string()
      })
      .allow(null),
    guarantee: joi
      .object({
        name: joi.string(),
        _id: joi.string()
      })
      .allow(null)
  })
  return schema.validate(data)
}

module.exports = {
  productModelsValidator
}
