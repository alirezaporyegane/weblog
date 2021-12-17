const bcrypt = require('bcrypt');
const NodeCache = require( "node-cache" );
const _ = require('lodash')
const myCache = new NodeCache({ stdTTL: 2 * 60 * 60, checkperiod: 5 * 60 });
const Kavenegar = require('kavenegar');
const User = require('../../models/User');
const { validateUser } = require('../validator/User');

class user {
  async register (req, res) {
    const error = validateUser(req.body)
    if (error) return res.status(400).json({
      msg: 'Bad Request',
      code: 400
    })

    const phone = req.body.phone
    const password = req.body.password
    User.find({ phone: phone })
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            msg: 'Conflict',
            code: 409
          })
        } else {
          bcrypt.hash(password, 12, (err, hash) => {
            if (err) {
              return res.status(500).json({
                msg: 'Internal Server Error',
                code: 500
              })
            } else {
              const user = new User({
                userName: req.body.userName,
                phone: phone,
                password: hash,
              })
              user.save()
                .then(result => {
                  const token = result.generateToken()

                  res.status(200).json({..._.pick(result, ['_id', 'userName', 'phone', 'email']), token: token})
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).json({
                    msg: 'Internal Server Error',
                    code: 500
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
      msg: 'Bad Request',
      code: 400
    })

    User.find({ phone: req.body.phone })
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            msg: 'Unauthorized',
            code: 401
          })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              msg: 'Unauthorized',
              code: 401
            })
          } else if (result) {
            const token = user[0].generateToken()
            return res.status(200).json({..._.pick(user[0], ['_id', 'userName', 'phone', 'email']),
              active: user[0].active,
              token : token
            })
          } else {
            res.status(401).json({
              msg: 'Unauthorized',
              code: 401
            })
          }
        })
      })
  }

  async sendCode (req, res) {
    User.findOne({ phone: req.user.phone })
    .then(user => {
        if (!user) return res.status(400).json({
          msg: 'Conflict',
          code: 409
        })

        const number = Math.floor((Math.random() * 90000) + 10000)

        myCache.set(user.phone, number)

        const api = Kavenegar.KavenegarApi({apikey: '785141742B50564B342F356C4D6C617876514C34542F634C4564384D435850596F4A2F2F596E51766E546B3D'});
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
          msg: 'Bad Request',
          code: 400
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
            msg: 'Bad Request',
            code: 400
          })
        }
      })
  }
}


module.exports = new user()