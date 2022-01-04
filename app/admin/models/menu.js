const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const menuSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    max: 250,
    min: 3
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
    type: String,
  },
  components: {
    type: String
  },
  sortOrder: {
    type: Number
  },
  availability: {
    type: Number
  }
})

if (mongoose.models.Menu) {
  Menu = mongoose.model('Menu');
} else {
  Menu = mongoose.model('Menu', menuSchema);
}

module.exports = Menu