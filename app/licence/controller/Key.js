const config = require('config')
const Modules = require('../models/Module')

class Keys {
  async update(req, res) {
    const userName = req.body.userName
    const password = req.body.password

    const user = config.get('userName')
    const pass = config.get('password')

    try {
      if (userName === user && password === pass) {
        const result = await Modules.findOne()

        console.log(result)

        if (result && result !== null) {
          result.modules = result.modules.splice(0, result.modules.length)

          result.modules = req.body.modules

          await result.save()

          res.status(200).json({
            success: 'true',
          })
        } else {
          const module = new Modules({
            modules: req.body.modules,
          })

          await module.save()

          res.status(200).json({
            success: true,
          })
        }
      } else {
        res.status(401).json({
          msg: 'Unauthorized',
          code: 401,
        })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500,
      })
    }
  }

  async remove(req, res) {
    const userName = req.body.userName
    const password = req.body.password

    const user = config.get('userName')
    const pass = config.get('password')

    try {
      if (userName === user && password === pass) {
        const result = await Modules.findOne()

        result.modules = []

        await result.save()

        res.status(200).json({
          success: 'true',
        })
      } else {
        res.status(401).json({
          msg: 'Unauthorized',
          code: 401,
        })
      }
    } catch (err) {}
  }
}

module.exports = new Keys()
