const User = require('../models/user.model');
const { generateToken } = require('../middleware/auth.middleware');

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);
    const userWithoutPassword = user.toJSON();

    res.json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
const logout = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

module.exports = { register, login, logout, getMe };
