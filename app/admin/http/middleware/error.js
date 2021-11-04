const winston = require('winston')

module.exports = (err,req, res, next) => {
  console.log(err)
  winston.error(err.message, err)
  res.status(500).json({
    msg: 'You have one error on the server',
    error: err
  })
}