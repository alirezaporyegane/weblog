const joi = require('joi')

function validatoProductGroup(data) {
  const Schema = joi.object({
    name: joi.string().required().max(150),
    color: joi.string().allow(null),
    image: joi.string().allow(null),
    slug: joi.string().required(),
    metaTitle: joi.string().allow(null),
    description: joi.string().allow(null),
    metaDescription: joi.string().allow(null),
    sortOrder: joi.number().integer().allow(null),
    categories: joi.array().allow(null),
  })
  return Schema.validate(data)
}

module.exports = {
  validatoProductGroup,
}
