const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

function validatorBankAccount(data) {
  const Schema = joi.object({
    name: joi.string().required(),
    owner: joi.string().required(),
    bankId: joi.objectId().allow(null),
    branchCode: joi.string().allow(null),
    branchName: joi.string().allow(null),
    accountNo: joi.string().allow(null),
    sheba: joi.string().allow(null),
    cardNo: joi.string().allow(null),
    sortOrder: joi.number().integer(),
  })
  return Schema.validate(data)
}

module.exports = {
  validatorBankAccount,
}
