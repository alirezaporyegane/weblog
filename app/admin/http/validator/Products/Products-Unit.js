const joi = require('joi')

function ValidateUnit (data) {
  const Schema = joi.object({
    name: joi.string().required(),
    sortOrder: joi.number().integer().required(),
    precision: joi.number().integer(),
    active: joi.boolean()
  })
  return Schema.validate(data)
}

module.exports = {
  ValidateUnit
}