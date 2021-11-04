const jwt = require('jsonwebtoken');
const config = require('config')

const authUsre = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({
      success: false,
      msg: 'Auth Failed'
    })

    const User = jwt.verify(token, config.get('secretKey'))
    req.user = User

    next()
  } catch (error) {
    return res.status(401).json({
      msg: 'Auth Failed'
    })
  }
}

const admin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next()
    } else
      return res.status(401).json({ msg: 'you are not admin'})
  } catch (err) {
    console.log(err)
  }
}

module.exports = { authUsre, admin }
