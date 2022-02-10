const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

function postCategoriesValidator(data) {
  const Schema = joi.object({
    name: joi.string().required(),
    slug: joi.string().allow(null),
    metaTitle: joi.string().allow(null),
    metaDescription: joi.string().allow(null).max(50),
    sortOrder: joi.number().integer(),
  })
  return Schema.validate(data)
}

module.exports = {
  postCategoriesValidator,
}
