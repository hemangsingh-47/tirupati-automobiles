import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      new ApiResponse(200, 'Login successful', {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      }).send(res);
    } else {
      next(new AppError('Invalid email or password', 401));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      new ApiResponse(200, 'Profile retrieved successfully', {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }).send(res);
    } else {
      next(new AppError('User not found', 404));
    }
  } catch (error) {
    next(error);
  }
};
