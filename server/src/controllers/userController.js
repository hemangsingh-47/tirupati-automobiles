import User from '../models/User.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    new ApiResponse(200, 'Users retrieved successfully', users).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new user (Staff/Admin)
// @route   POST /api/users
// @access  Private/Admin
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError('User already exists', 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'staff',
    });

    if (user) {
      new ApiResponse(201, 'User created successfully', {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }).send(res);
    } else {
      next(new AppError('Invalid user data', 400));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Prevent deleting the very last admin
      if (user.role === 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
          return next(new AppError('Cannot delete the last admin account', 400));
        }
      }

      await user.deleteOne();
      new ApiResponse(200, 'User removed', null).send(res);
    } else {
      next(new AppError('User not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user (Role/Active status)
// @route   PATCH /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (req.body.role) {
        // Prevent changing the role of the last admin
        if (user.role === 'admin' && req.body.role !== 'admin') {
          const adminCount = await User.countDocuments({ role: 'admin' });
          if (adminCount <= 1) {
            return next(new AppError('Cannot change role of the last admin account', 400));
          }
        }
        user.role = req.body.role;
      }
      
      if (req.body.isActive !== undefined) {
        if (user.role === 'admin' && req.body.isActive === false) {
           const adminCount = await User.countDocuments({ role: 'admin', isActive: true });
           if (adminCount <= 1) {
             return next(new AppError('Cannot deactivate the last active admin account', 400));
           }
        }
        user.isActive = req.body.isActive;
      }

      const updatedUser = await user.save();
      new ApiResponse(200, 'User updated successfully', {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive
      }).send(res);
    } else {
      next(new AppError('User not found', 404));
    }
  } catch (error) {
    next(error);
  }
};
