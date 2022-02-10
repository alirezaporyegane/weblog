const joi = require('joi')

function validatoInventories(data) {
  const Schema = joi.object({
    name: joi.string().required(),
    code: joi.string(),
    sortOrder: joi.number(),
    active: joi.boolean(),
  })
  return Schema.validate(data)
}

module.exports = {
  validatoInventories,
}
