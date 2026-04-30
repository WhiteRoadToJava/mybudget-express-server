const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userschema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format',
      ],
  },
  password:{
    type: String,
    required: true,
  },
  roles:{
    type: [String],
    enum: ['USER', 'ADMIN'],
    default: ['USER'],
  },
  firstname:{
    type: String,
    required: true,
  },
  lastname:{
    type: String,
    required: true,
  },
  },
  {timestamps: true}
);

// Hash the password before saving the user
userschema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare the provided password with the hashed password in the database
userschema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userschema);

module.exports = User;
