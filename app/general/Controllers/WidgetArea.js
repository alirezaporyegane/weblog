const widgetAreaModel = require('../../admin/models/widgets/Widgets')
;(Post = require('../../admin/models/Post/Posts')),
  (Product = require('../../admin/models/Prodcuts/Product')),
  (Brand = require('../../admin/models/Prodcuts/Products-Brand')),
  (ProductGroups = require('../../admin/models/Prodcuts/Products-Groups')),
  (Modules = require('../../licence/models/Module'))

class WidgetArea {
  async getWidget(req, res) {
    try {
      const id = req.params.id
      const result = await widgetAreaModel.findOne({ _id: id })
      if (result) {
        const models = await Modules.findOne()

        result.widget.forEach(async (o) => {
          if (o.type === 'Posts') {
            const post = await Post.find().limit(o.count)
            o.data = [...post]

            const mustHaveModules = models.modules.findIndex((o) => o === 'Posts')

            o.mustHaveModules = mustHaveModules ? [mustHaveModules] : null
            o.mustHaveNotModules = null
            o.mustHaveAllModules = null
          } else if (o.type === 'product') {
            const products = await Product.find().limit(o.count)
            o.data = [...products]
          } else if (o.type === 'Brands') {
            const brand = await Brand.find()
              .limit(o.count)
              .select(['_id', 'title', 'altName', 'image', 'body'])

            const mustHaveModules = models.modules.findIndex((o) => o === 'brands')

            o.data = [...brand]
            o.mustHaveModules = mustHaveModules ? [mustHaveModules] : null
            o.mustHaveNotModules = null
            o.mustHaveAllModules = null
          } else if (o.type === 'ProductGroups') {
            const productGroups = await ProductGroups.find({}, { categories: 0 }).limit(o.count)

            const mustHaveModules = models.modules.findIndex((o) => o === 'products_groups')

            o.data = [...productGroups]
            o.mustHaveModules = mustHaveModules ? [mustHaveModules] : null
            o.mustHaveNotModules = null
            o.mustHaveAllModules = null
          }
        })

        const data = await result.save()

        res.status(200).json(data.widget)
      } else {
        res.status(404).json({
          msg: 'Not Found',
          code: 404,
        })
      }
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }
}

module.exports = new WidgetArea()
