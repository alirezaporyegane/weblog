const jwt = require('jsonwebtoken')
const config = require('config')

const authUsre = (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if (!token)
      return res.status(401).json({
        msg: 'Unauthorized',
        code: 401
      })

    const User = jwt.verify(token, config.get('secretKey'))
    req.user = User

    next()
  } catch (error) {
    return res.status(401).json({
      msg: 'Unauthorized',
      code: 401
    })
  }
}

const role = (roles) => {
  return async (req, res, next) => {
    try {
      if (typeof module === 'string') module = [module]
      const hasRole = req.user.role && !!req.user.role.find((o) => roles.includes(o))

      if (!hasRole)
        return res.status(401).json({
          msg: 'Unauthorized',
          code: 401
        })

      next()
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}
module.exports = { authUsre, role }
