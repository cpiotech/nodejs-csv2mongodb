const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  mid: { type: String, unique: true },
  account: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  type: Number,
  validTime: String,
  name: String,
  email: String,
  address: String,
  unit: String,
  department: String,
  position: String
});

memberSchema.pre('save', function(next) {
  const self = this;
  if (!self.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(self.password, salt, null, function(err, hash) {
      self.password = hash;
      next();
    });
  });
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
