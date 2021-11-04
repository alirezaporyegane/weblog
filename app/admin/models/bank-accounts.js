const mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const bankAccountsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  bankId: {
    type: ObjectId,
    ref: 'Banks'
  },
  branchCode: {
    type: String
  },
  branchName: {
    type: String
  },
  accountNo: {
    type: String
  },
  sheba: {
    type: String
  },
  cardNo: {
    type: String
  },
  sortOrder: {
    type: Number
  }
})

module.exports = mongoose.model('BankAccounts', bankAccountsSchema)