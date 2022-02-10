const joi = require('joi')

function validateUser(data) {
  const Schema = joi.object({
    userName: joi.string(),
    phone: joi.string().length(11).required(),
    password: joi.string().min(3).max(50).required(),
    repeatPassword: joi.ref('password'),
  })
  Schema.validate(data)
}

module.exports = {
  validateUser,
}
