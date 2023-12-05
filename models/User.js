const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.statics.createUser = async function (username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new this({ username, password: hashedPassword });
  return user.save();
};

userSchema.statics.findAllUsers = function () {
  return this.find();
};

userSchema.statics.findUserById = function (userId) {
  return this.findById(userId);
};

userSchema.statics.updateUserById = function (userId, update) {
  return this.findByIdAndUpdate(userId, update, { new: true });
};

userSchema.statics.deleteUserById = function (userId) {
  return this.findByIdAndRemove(userId);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
