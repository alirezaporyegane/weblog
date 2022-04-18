const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

const validationSalePlans = (data) => {
  const schema = joi.object({
    from: joi.number().integer().required(),
    discount: joi.number().min(0).required(),
    discountPercent: joi.number().min(0).max(100).required(),
    priceBeforeDiscount: joi.number().min(0).required(),
    priceAfterDiscount: joi.number().min(0),
    productArticleId: joi.objectId()
  })

  return schema.validate(data)
}

module.exports = { validationSalePlans }
