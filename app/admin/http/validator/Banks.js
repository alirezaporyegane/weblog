const joi = require('joi')

function validatorBanks(data) {
  const Schema = joi.object({
    name: joi.string().max(250).required(),
    code: joi.string().required(),
    logo: joi.string().allow(null),
    active: joi.boolean(),
  })
  return Schema.validate(data)
}

module.exports = {
  validatorBanks,
}
