const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
});

// hashes the password before saving the user to the database
// eslint-disable-next-line func-names
// `this` binding only works inside function() {} body
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);

    if (!salt) {
      next('error: cannot generate salt');
      return;
    }

    user.password = await bcrypt.hash(user.password, salt);
    if (!user.password) {
      next('error: cannot hash password');
      return;
    }

    next();
  }
});

// login function that compares the password hash
// eslint-disable-next-line func-names
// `this` binding only works inside function() {} body
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
