const joi = require('joi')

function ValidateCustomer (data) {
  const Schema = joi.object({
    fristName: joi.string().min(3).max(30).required(),
    latsName: joi.string().min(3).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] } }),
    address: joi.string().min(3).max(200).required()
  })
  return Schema.validate(data)
}

module.exports = {
  ValidateCustomer
}