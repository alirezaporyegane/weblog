const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

const productPackagesValidator = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    unitsQuantity: joi.number().integer().min(0).max(2147483647),
    minOq: joi.number().required(),
    maxOq: joi.number().allow(null),
    default: joi.boolean(),
    sortOrder: joi.number().integer(),
    productArticleId: joi.objectId()
  })
  return schema.validate(data)
}

module.exports = { productPackagesValidator }
