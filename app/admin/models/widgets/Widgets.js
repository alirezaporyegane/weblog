const mongoose = require('mongoose')
const Schema = mongoose.Schema

const widgetAreaSchema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
      required: true,
    },
    widget: [Schema.Types.Mixed],
  },
  { _id: false }
)

module.exports = mongoose.model('WidgetAreas', widgetAreaSchema)
