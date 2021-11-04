const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

function menuValidator (data) {
  const Schema = joi.object({
    title: joi.string(),
    url: joi.any(),
    target: joi.string(),
    icon: joi.any(),
    viewData: joi.any(),
    parentId: joi.objectId(),
    components: joi.any(),
    sortOrder: joi.number(),
    availability: joi.string()
  })
  return Schema.validate(data)
}

module.exports = { menuValidator }