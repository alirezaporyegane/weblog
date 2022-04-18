const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

function validateProductsCategories(data) {
  const Schema = joi.object({
    name: joi.string().required().max(150),
    slug: joi.string(),
    image: joi.string().allow(null),
    sortOrder: joi.number().integer().allow(null),
    metaTitle: joi.string().allow(null),
    description: joi.string().allow(null),
    metaDescription: joi.string().min(150).allow(null),
    parentId: joi.string().allow(null),
    altName: joi.string().allow(null),
    tags: joi.array().allow(null),
    otherNames: joi.array().allow(null),
    typeId: joi.objectId().allow(null),
    active: joi.boolean().allow(null),
    groupId: joi.objectId().required(),
    group: joi.object({
      _id: joi.objectId().required(),
      name: joi.string().required(),
      slug: joi.string().required()
    })
  })
  return Schema.validate(data)
}

module.exports = {
  validateProductsCategories
}
