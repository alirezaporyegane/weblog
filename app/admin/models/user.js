const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config');
const { string } = require('joi');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    enum: [ 'root' ]
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'User'
  },
  active: {
    type: Boolean,
    default: false
  }
})

userSchema.methods.generateToken = function () {
  const data = {
    _id: this._id,
    phone: this.phone,
    userName: this.userName,
    email: this.email,
    role: this.role
  }

  return jwt.sign(data, config.get('secretKey'))
}

module.exports = mongoose.model('User', userSchema)