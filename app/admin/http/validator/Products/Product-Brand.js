const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

function brandValidator(data) {
  const Schema = joi.object({
    title: joi.string().required(),
    altName: joi.string().allow(null),
    slug: joi.string().required(),
    sortOrder: joi.number().integer().required(),
    typeId: joi.objectId().allow(null),
    image: joi.string().allow(null),
    tags: joi.array().allow(null),
    otherName: joi.array().allow(null),
    metaTitle: joi.string().allow(null),
    metaDescription: joi.string().allow(null),
    body: joi.string().allow(null),
  })
  return Schema.validate(data)
}

module.exports = {
  brandValidator,
}
