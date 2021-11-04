const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const managerAccountSchema = new Schema({
  requireConfirmedEmail: {
    type: Boolean
  },
  requireConfirmedPhoneNumber: {
    type: Boolean
  },
  requireConfirmedProfile: {
    type: Boolean
  },
  loginViaUserNameEnabled: {
    type: Boolean
  },
  loginViaEmailEnabled: {
    type: Boolean
  },
  loginViaPhoneNumberEnabled: {
    type: Boolean
  },
  loginViaOtpEnabled: {
    type: Boolean
  },
  registerViaUserNameEnabled: {
    type: Boolean
  },
  registerViaEmailEnabled: {
    type: Boolean
  },
  registerViaPhoneNumberEnabled: {
    type: Boolean
  },
  registerViaOtpEnabled: {
    type: Boolean
  }
})

const sellerAccountSchema = new Schema({
  requireConfirmedEmail: {
    type: Boolean
  },
  requireConfirmedPhoneNumber: {
    type: Boolean
  },
  requireConfirmedProfile: {
    type: Boolean
  },
  loginViaUserNameEnabled: {
    type: Boolean
  },
  loginViaEmailEnabled: {
    type: Boolean
  },
  loginViaPhoneNumberEnabled: {
    type: Boolean
  },
  loginViaOtpEnabled: {
    type: Boolean
  },
  registerViaUserNameEnabled: {
    type: Boolean
  },
  registerViaEmailEnabled: {
    type: Boolean
  },
  registerViaPhoneNumberEnabled: {
    type: Boolean
  },
  registerViaOtpEnabled: {
    type: Boolean
  }
})

const settingSchema = new Schema({
  userDeletionEnabled: {
    type: Boolean
  },
  managerAccount: [managerAccountSchema],
  sellerAccount: [sellerAccountSchema],
  title: {
    type: String,
    required: true
  },
  altTitle: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  logo: String,
  logoAlt: String,
  logoAndroid: String,
  favIcon: String,
  noImage: String,
  whatsapp: String,
  instagram: String,
  telegram: String,
  twitter: String,
  youtube: String,
  aparat: String,
  facebook: String,
  email: String,
  linkedin: String,
  phoneNumber: String,
  address: String 
})

module.exports = mongoose.model('Settings', settingSchema)