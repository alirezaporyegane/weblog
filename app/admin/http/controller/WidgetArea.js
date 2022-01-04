const { widgetName } = require('../../models/widgets/WidgetName');
const WidgetModel = require('../../models/widgets/Widgets');

class WidgetArea {
  async getName (req, res) {
    try {
      res.status(200).json(widgetName)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getById (req, res) {
    const id = req.params.id

    const result = await WidgetModel.findOne({ _id: id })

    try {
      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async UpdateById (req, res) {
    const id = req.params.id

    try {
      const widget = await WidgetModel.findOne({ _id: id })

      if (widget && widget !== null) {
        const result = await WidgetModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })

        res.status(200).json(result)
      } else {
        const result = await WidgetModel.create(req.body)

        res.status(200).json(result)
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new WidgetArea()