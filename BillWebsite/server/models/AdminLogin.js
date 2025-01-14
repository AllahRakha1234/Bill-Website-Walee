const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

// Hash the password before saving the admin user
adminLoginSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Only hash if password is modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

  

// Method to compare entered password with hashed password
adminLoginSchema.methods.comparePassword = async function (password) {
    console.log("Comparing:", password, "with", this.password);
    return await bcrypt.compare(password, this.password);
  };
  

module.exports = mongoose.model('AdminLoginInfo', adminLoginSchema);
