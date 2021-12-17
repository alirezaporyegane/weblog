const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)

function productValidate (data) {
  const schema = joi.object({
    title: joi.string().min(3).max(30).required(),
    price: joi.number().integer().required(),
    date: joi.date(),
    image: joi.string(),
    brand: joi.objectId(),
    typeId: joi.objectId(),
    body: joi.any(),
    alert: joi.any()
  })
  schema.validate(data)
}

module.exports = { 
  productValidate
}