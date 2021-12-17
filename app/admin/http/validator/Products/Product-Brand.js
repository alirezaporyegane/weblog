const joi = require('joi');

function brandValidator (data) {
  const Schema = joi.object({
    title: joi.string().required(),
    altName: joi.string(),
    slug: joi.string().required(),
    sortOrder: joi.number().integer().required(),
    tags: joi.array(),
    mataTitle: joi.string(),
    metaDescription: joi.string(),
    body: joi.string().allow(null),
  })
  return Schema.validate(data)
}

module.exports = {
  brandValidator
}