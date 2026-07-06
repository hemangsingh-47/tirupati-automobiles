import Customer from '../models/Customer.js';
import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new customer
// @route   POST /api/customers/auth/register
// @access  Public
export const registerCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
      return next(new AppError('Customer already exists with this email', 400));
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      password,
    });

    if (customer) {
      new ApiResponse(201, 'Customer registered successfully', {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        token: generateToken(customer._id),
      }).send(res);
    } else {
      next(new AppError('Invalid customer data', 400));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth customer & get token
// @route   POST /api/customers/auth/login
// @access  Public
export const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email }).select('+password');

    if (customer && (await customer.matchPassword(password))) {
      new ApiResponse(200, 'Login successful', {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        profilePicture: customer.profilePicture,
        token: generateToken(customer._id),
      }).send(res);
    } else {
      next(new AppError('Invalid email or password', 401));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get customer profile
// @route   GET /api/customers/auth/profile
// @access  Private (Customer)
export const getCustomerProfile = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.customer._id);

    if (customer) {
      new ApiResponse(200, 'Profile retrieved successfully', customer).send(res);
    } else {
      next(new AppError('Customer not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update customer profile
// @route   PUT /api/customers/auth/profile
// @access  Private (Customer)
export const updateCustomerProfile = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.customer._id);

    if (customer) {
      customer.name = req.body.name || customer.name;
      customer.email = req.body.email || customer.email;
      customer.phone = req.body.phone || customer.phone;
      customer.address = req.body.address || customer.address;
      customer.profilePicture = req.body.profilePicture || customer.profilePicture;

      if (req.body.password) {
        customer.password = req.body.password;
      }

      const updatedCustomer = await customer.save();

      new ApiResponse(200, 'Profile updated successfully', {
        _id: updatedCustomer._id,
        name: updatedCustomer.name,
        email: updatedCustomer.email,
        phone: updatedCustomer.phone,
        address: updatedCustomer.address,
        profilePicture: updatedCustomer.profilePicture,
        token: generateToken(updatedCustomer._id),
      }).send(res);
    } else {
      next(new AppError('Customer not found', 404));
    }
  } catch (error) {
    next(error);
  }
};
