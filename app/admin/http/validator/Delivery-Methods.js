const joi = require('joi');

function validateDeliveryMethods (data) {
  const Schema = joi.object({
    name: joi.string().max(150).required(),
    description: joi.string().allow(null),
    image: joi.string().allow(null),
    payOnDelivery: joi.boolean(),
    hideFee: joi.boolean(),
    sortOrder: joi.number().integer(),
    active: joi.boolean(),
    rangesFeeType: joi.number().integer(),
    calculationMethod: joi.number().integer(),
    baseFee: joi.number(),
    ranges: joi.array().items(joi.any().required())
  })

  return Schema.validate(data);
}

module.exports = {
  validateDeliveryMethods
}