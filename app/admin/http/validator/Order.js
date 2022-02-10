const joi = require('joi')

function ValidateOrder(data) {
  const Schema = joi.object({
    title: joi.string().min(3).max(30).required(),
    quntity: joi.number().integer().positive().required(),
  })
  return Schema.validate(data)
}

module.exports = {
  ValidateOrder,
}
