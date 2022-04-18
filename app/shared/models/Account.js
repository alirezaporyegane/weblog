const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('config'),
  Schema = mongoose.Schema

const accountSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  userName: {
    type: String,
    default: 'root'
  },
  userType: {
    type: Number,
    enum: [0, 1, 2]
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  legality: {
    type: Number,
    enum: [0, 1]
  },
  password: {
    type: String
  },
  role: [
    {
      type: String,
      default: 'User'
    }
  ],
  image: {
    type: String
  },
  companyName: {
    type: String
  },
  confirmEmail: {
    type: Boolean,
    default: false
  },
  fristLogin: {
    type: Boolean,
    default: true
  },
  confirmPhoneNumber: {
    type: Boolean,
    default: false
  },
  suspended: {
    type: Boolean,
    default: false
  },
  confirmedProfile: {
    type: Boolean,
    default: false
  },
  profileFields: [
    {
      type: {
        type: Number,
        enum: [0, 1, 2, 3, 4]
      },
      value: {
        type: String
      }
    }
  ]
})

accountSchema.methods.generateToken = function () {
  const data = {
    _id: this._id,
    phoneNumber: this.phoneNumber,
    email: this.email,
    role: this.role,
    confirmEmail: this.confirmEmail,
    confirmPhoneNumber: this.confirmPhoneNumber
  }

  return jwt.sign(data, config.get('secretKey'))
}

module.exports = mongoose.model('Account', accountSchema)
