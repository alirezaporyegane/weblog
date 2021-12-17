const joi = require('joi');

function validatoProductRelationTypes (data) {
  const Schema = joi.object({
    primarySideName: joi.string().required().max(150),
    relatedSideName: joi.string().required().max(150),
    sortOrder: joi.number(),
  });
  return Schema.validate(data);
};

module.exports = {
  validatoProductRelationTypes
};