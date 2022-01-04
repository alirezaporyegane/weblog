const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modulesSchema = new Schema({
  modules: [String]
})

module.exports = mongoose.model('Modules', modulesSchema)
