const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    default: 'root',
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'User',
  },
  active: {
    type: Boolean,
    default: false,
  },
  confirmEmail: {
    type: Boolean,
    default: false,
  },
  confirmPhoneNumber: {
    type: Boolean,
    default: false,
  },
})

userSchema.methods.generateToken = function () {
  const data = {
    _id: this._id,
    phone: this.phone,
    email: this.email,
    role: this.role,
    confirmEmail: this.confirmEmail,
    confirmPhoneNumber: this.confirmPhoneNumber,
  }

  return jwt.sign(data, config.get('secretKey'))
}

module.exports = mongoose.model('User', userSchema)
