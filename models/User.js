const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Item Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
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
  rgister_date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model('user', UserSchema);
