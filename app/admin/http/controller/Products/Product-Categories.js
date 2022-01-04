const mongoose = require('mongoose'),
_ = require('lodash'),
productCategoriesModel = require('../../../models/Prodcuts/Products-Categories'),
productGroupModel = require('../../../models/Prodcuts/Products-Groups');

class ProductCategories {
  async getAllCategoreies (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })


    try {
      const result = await productGroupModel.findById(id)

      res.status(200).json(result.categories)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async updateCategoreies (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    try {
      const data = await productGroupModel.findById(id)

      data.categories.splice(0, data.categories.length)
      data.categories = req.body
      const result = await data.save()

      const productsCat = await productCategoriesModel.find()
      result.categories.forEach(async(item) => {
        if (!!productsCat.find(o => o._id === item._id)) {  
          await productCategoriesModel.updateMany(item._id, item)
        } else {
          await productCategoriesModel.insertMany(item)
        }
      })

      res.status(200).json(result.categories)
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getInfo (req, res) {

  }

  async getById (req, res) {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    try {
      const result = await productCategoriesModel.findById(id)

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async update (req, res) {

  }
}

module.exports = new ProductCategories()