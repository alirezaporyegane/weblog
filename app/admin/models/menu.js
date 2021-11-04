const mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const menuSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String
  },
  target: {
    type: String
  },
  icon: {
    type: String
  },
  viewData: {
    type: String
  },
  parentId: {
    type: ObjectId
  },
  components: {
    type: String
  },
  sortOrder: {
    type: Number
  },
  availability: {
    type: String
  }
})

module.exports = mongoose.model('Menu', menuSchema)