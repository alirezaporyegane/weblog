const Modules = require('../../../licence/models/Module');

const hasModule = (module) => {
  return async (req, res, next) => {
    try {
      if (typeof module === 'string')
      module = [module]
  
      const all = await Modules.findOne()
      const hasTheModule = !!all.modules.find(o => module.includes(o))

      if (!hasTheModule) return res.status(403).json({
        msg: 'Forbidden',
        code: 403
      })
  
      next()
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

const hasAllModules = (module) => {
  return async (req, res, next) => {
    try {
      if (typeof module === 'string')
        module = [module]

      const all = await Modules.findOne()
      const hasAllTheModules = !!module.every(o => all.includes(o))
      
      if (!hasAllTheModules) return res.status(403).json({
        msg: 'Forbidden',
        code: 403
      })

      next()
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = { hasModule, hasAllModules }