const joi = require('joi')

function ValidatorCurrencies(data) {
  const Schema = joi.object({
    id: joi.string().required(),
    name: joi.string().max(150).required(),
    rate: joi.number().required(),
    symbol: joi.string().allow(null),
    image: joi.string().allow(null),
    precision: joi.number().integer().max(10).min(0),
    sortOrder: joi.number().integer(),
    active: joi.boolean(),
  })
  return Schema.validate(data)
}

module.exports = {
  ValidatorCurrencies,
}
