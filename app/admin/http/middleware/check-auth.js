const jwt = require('jsonwebtoken');
const config = require('config')

const authUsre = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({
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

const admin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next()
    } else
      return res.status(401).json({ 
        msg: 'Unauthorized',
        code: 401
      })
  } catch (err) {
    res.status(500).json({
      msg: 'Internal Server Error',
      code: 500
    })
  }
}

module.exports = { authUsre, admin }
