const User = require('../models/User'); // ✅ capital U to avoid conflict
const generateToken = require('../utils/generateToken');

const registerUser = async (userData) => {
  const existingUser = await User.findOne({ username: userData.username });
  if (existingUser) {
    const error = new Error('User already exists');
    error.status = 400;
    throw error;
  }

  const newUser = await User.create(userData);
  const token = generateToken({ id: newUser.id, roles: newUser.roles });

  return {
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
      roles: newUser.roles,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
    },
  };
}; // ✅ registerUser ends here

const loginUser = async (loginRequest) => { // ✅ outside registerUser
  const user = await User.findOne({ username: loginRequest.username }).select('+password');
  if (!user) {
    const error = new Error('Invalid username or password');
    error.status = 401;
    throw error;
  }

  const isMatch = await user.matchPassword(loginRequest.password);
  if (!isMatch) {
    const error = new Error('Invalid username or password');
    error.status = 401;
    throw error;
  }

  const token = generateToken({ id: user.id, roles: user.roles });
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  };
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      roles: user.roles,
      firstname: user.firstname,
      lastname: user.lastname,
    },
  };
}; // ✅ loginUser ends here

module.exports = { registerUser, loginUser }; // ✅ outside both functions