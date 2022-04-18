const bcrypt = require('bcrypt')
const NodeCache = require('node-cache')
const _ = require('lodash')
const myCache = new NodeCache({ stdTTL: 2 * 60 * 60, checkperiod: 5 * 60 })
const Kavenegar = require('kavenegar')
const config = require('config')
const jwt = require('jsonwebtoken')
const accountModel = require('../../models/Account')

class Account {
  async register(req, res) {
    // const error = validateUser(req.body)
    // if (error)
    //   return res.status(400).json({
    //     msg: 'Bad Request',
    //     code: 400
    //   })

    const phoneNumber = req.body.phoneNumber
    const password = req.body.password
    const userType = req.body.userType

    accountModel
      .find({ suspended: false, userType: userType, phoneNumber: phoneNumber })
      .then((account) => {
        if (account.length >= 1) {
          return res.status(409).json({
            msg: 'Conflict',
            code: 409
          })
        } else {
          bcrypt.hash(password, 12, (err, hash) => {
            if (err) {
              return res.status(500).json({
                data: err,
                msg: 'Internal Server Error',
                code: 500
              })
            } else {
              const account = new accountModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                companyName: req.body.companyName,
                userName: req.body.userName,
                image: req.body.image,
                legality: req.body.legality,
                phoneNumber: phoneNumber,
                password: hash,
                userType: req.body.userType
              })
              account
                .save()
                .then((result) => {
                  const token = result.generateToken()

                  res.status(200).json({
                    ..._.pick(result, ['_id', 'userName', 'phoneNumber', 'email']),
                    token: token
                  })
                })
                .catch((err) => {
                  res.status(500).json({
                    data: err,
                    msg: 'Internal Server Error',
                    code: 500
                  })
                })
            }
          })
        }
      })
  }

  async login(req, res) {
    // const error = validateUser(req.body)
    // if (error)
    //   return res.status(400).json({
    //     msg: 'Bad Request',
    //     code: 400
    //   })

    const userType = req.body.userType

    accountModel.find({ userType: userType, phoneNumber: req.body.phoneNumber }).then((account) => {
      if (account.length < 1) {
        return res.status(401).json({
          msg: 'Unauthorized',
          code: 401
        })
      }
      bcrypt.compare(req.body.password, account[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            msg: 'Unauthorized',
            code: 401
          })
        } else if (result) {
          const token = account[0].generateToken()
          if (userType === 1) {
            return res.status(200).json({
              ..._.pick(account[0], ['_id', 'userName', 'phoneNumber', 'email', 'role']),
              token: token
            })
          } else {
            return res.status(200).json({
              ..._.pick(account[0], ['_id', 'userName', 'phoneNumber', 'email']),
              token: token
            })
          }
        } else {
          res.status(401).json({
            msg: 'Unauthorized',
            code: 401
          })
        }
      })
    })
  }

  async sendCode(req, res) {
    try {
      const token = req.header('x-auth-token')
      if (!token)
        return res.status(401).json({
          msg: 'Unauthorized',
          code: 401
        })

      const User = jwt.verify(token, config.get('secretKey'))

      const number = Math.floor(Math.random() * 90000 + 10000)

      myCache.set(User.phoneNumber, number)

      const api = Kavenegar.KavenegarApi({
        apikey:
          '785141742B50564B342F356C4D6C617876514C34542F634C4564384D435850596F4A2F2F596E51766E546B3D'
      })
      api.Send(
        {
          message: `برای ورود به سایت کد ${number} در سایت وارد کنید`,
          sender: '1000596446',
          receptor: User.phoneNumber
        },
        (result, status) => {
          res.status(status).json({
            success: status === 200 ? true : false,
            msg: status === 200 ? 'success' : 'Not Implemented',
            code: status
          })
        }
      )
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getCode(req, res) {
    const code = req.body.code

    const token = req.header('x-auth-token')
    if (!token)
      return res.status(401).json({
        msg: 'Unauthorized',
        code: 401
      })

    const User = jwt.verify(token, config.get('secretKey'))

    accountModel.findOne({ phoneNumber: User.phoneNumber }).then((result) => {
      if (!code)
        return res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })

      const newCode = code
      const lastCode = myCache.get(result.phoneNumber)

      if (parseInt(newCode) === lastCode) {
        accountModel.findById(result._id).then((user) => {
          user.confirmPhoneNumber = true
          user.save().then((result) => {
            res.status(200).json('success')
          })
        })
      } else {
        res.status(400).json({
          msg: 'Bad Request',
          code: 400
        })
      }
    })
  }

  async sendOtp(req, res) {
    try {
      const number = Math.floor(Math.random() * 90000 + 10000)

      myCache.set(req.body.phoneNumber, number)
      const api = Kavenegar.KavenegarApi({
        apikey:
          '785141742B50564B342F356C4D6C617876514C34542F634C4564384D435850596F4A2F2F596E51766E546B3D'
      })

      api.Send(
        {
          message: `برای ورود به سایت کد ${number} در سایت وارد کنید`,
          sender: '1000596446',
          receptor: req.body.phoneNumber
        },
        (result, status) => {
          res.status(status).json({
            success: true
          })
        }
      )
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async otpLogin(req, res) {
    const code = req.body.code

    if (!code)
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    const newCode = code
    const lastCode = myCache.get(req.body.phoneNumber)

    if (parseInt(newCode) === lastCode) {
    }
  }

  async confirmEmail(req, res) {
    sendMail()
  }

  async changeEmail(req, res) {
    if (!req.body.newEmail)
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    try {
      const token = req.header('x-auth-token')
      if (!token)
        return res.status(401).json({
          msg: 'Unauthorized',
          code: 401
        })

      const User = jwt.verify(token, config.get('secretKey'))
      await accountModel.findByIdAndUpdate(User._id, {
        email: req.body.newEmail,
        confirmEmail: false
      })

      res.status(200).json('success')
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async changePhoneNumber(req, res) {
    if (!req.body.newPhoneNumber)
      return res.status(400).json({
        msg: 'Bad Request',
        code: 400
      })

    try {
      const token = req.header('x-auth-token')
      if (!token)
        return res.status(401).json({
          msg: 'Unauthorized',
          code: 401
        })

      const account = await accountModel.find({ phoneNumber: req.body.newPhoneNumber })
      if (account.length >= 1) {
        return res.status(409).json({
          msg: 'Conflict',
          code: 409
        })
      }

      const User = jwt.verify(token, config.get('secretKey'))
      await accountModel.findByIdAndUpdate(User._id, {
        phoneNumber: req.body.newPhoneNumber,
        confirmPhoneNumber: false
      })

      res.status(200).json('success')
    } catch (err) {
      res.status(500).json({
        data: err,
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }
}

module.exports = new Account()
