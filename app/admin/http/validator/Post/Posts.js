const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

function postValidator(data) {
  const Schema = joi.object({
    title: joi.string().required().max(150),
    slug: joi.string().allow(null).max(150),
    image: joi.string().allow(null),
    header: joi.string().allow(null),
    excerpt: joi.string().allow(null).max(300),
    lead: joi.string().allow(null).max(500),
    body: joi.string().allow(null),
    metaTitle: joi.string().allow(null),
    metaDescription: joi.string().allow(null),
    featured: joi.boolean(),
    primaryCategoryId: joi.objectId().required(),
    published: joi.string().allow(null),
  })
  return Schema.validate(data)
}

module.exports = { postValidator }
