const bcrypt = require('bcrypt');
const NodeCache = require( "node-cache" );
const _ = require('lodash')
const myCache = new NodeCache({ stdTTL: 2 * 60 * 60, checkperiod: 5 * 60 });
const Kavenegar = require('kavenegar');
const User = require('../../models/user');
const { validateUser } = require('../validator/User');

class user {
  async register (req, res) {
    const error = validateUser(req.body)
    if (error) return res.status(400).json({
      msg: error.messegae,
      success: false
    })

    const phone = req.body.phone
    const password = req.body.password
    User.find({ phone: phone })
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            msg: 'User Exists'
          })
        } else {
          bcrypt.hash(password, 12, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
                success: false
              })
            } else {
              const user = new User({
                userName: req.body.userName,
                email: req.body.email,
                phone: phone,
                password: hash,
              })
              user.save()
                .then(result => {
                  const token = result.generateToken()

                  res.status(200).json({..._.pick(result, ['_id', 'userName', 'phone' ,'email', 'role' ]), token: token})
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).json({
                    error: err,
                    success: false
                  })
                })
            }
          })
        }
      })
  }

  async login (req, res) {
    const error = validateUser(req.body)
    if (error) return res.status(400).json({
      msg: error.messegae,
      success: false
    })

    User.find({ phone: req.body.phone })
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            msg: 'Auth Failed'
          })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              msg: 'Auth Failed'
            })
          } else if (result) {
            const token = user[0].generateToken()
            return res.status(200).json({active: user[0].active, isLogin: result, token : token, ..._.pick(user[0], ['userName', 'role', 'email', 'phone'])})
          } else {
            res.status(401).json({
              msg: 'Auth Failed'
            })
          }
        })
      })
  }

  async sendCode (req, res) {
    User.findOne({ phone: req.user.phone })
    .then(user => {
      console.log(user);
        if (!user) return res.status(400).json({
          msg: 'User Not Found'
        })

        const number = Math.floor((Math.random() * 90000) + 10000)

        myCache.set(user.phone, number)

        const api = Kavenegar.KavenegarApi({ apikey: process.env.apiKeyKAvenegar });

        api.Send({ 
          message: `برای ورود به سایت کد ${number} در سایت وارد کنید`,
          sender: "1000596446",
          receptor: user.phone
        }, (result, status) => {
          res.status(status).json({
            success: true
          })
        });

      })
  }

  async getCode (req, res) {
    const code = req.body.code

    User.findOne({ phone: req.user.phone })
      .then(result => {
        if (!code) return res.status(400).json({
          msg: 'Please enter code'
        })
      
        const newCode = code
        const lastCode = myCache.get(result.phone)
      
        if (parseInt(newCode) === lastCode) {
          User.findById(result._id)
            .then(user => {
                user.active = true
                user.save()
                  .then(result => {
                    res.status(200).json({
                      success: true,
                      result
                    })
                  })
            })
        } else {
          res.status(400).json({
            msg: 'your code is not correct'
          })
        }
      })
  }
}


module.exports = new user()