import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

// @desc    Create new booking for logged in customer
// @route   POST /api/customers/bookings
// @access  Private (Customer)
export const createCustomerBooking = async (req, res, next) => {
  try {
    const {
      carBrand,
      carModel,
      manufacturingYear,
      fuelType,
      registrationNumber,
      serviceType,
      problemDescription,
      preferredDate,
      preferredTime,
    } = req.body;

    const customer = req.customer;

    const images = req.files ? req.files.map(file => file.filename) : [];

    const booking = await Booking.create({
      customerId: customer._id,
      customerName: customer.name,
      phoneNumber: customer.phone,
      email: customer.email,
      carBrand,
      carModel,
      manufacturingYear,
      fuelType,
      registrationNumber,
      serviceType,
      problemDescription,
      preferredDate,
      preferredTime,
      images,
      statusHistory: [{
        status: 'Booking Received',
        updatedBy: 'System',
        notes: 'Booking submitted successfully via Customer Portal'
      }]
    });

    new ApiResponse(201, 'Booking created successfully', booking).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings for logged in customer
// @route   GET /api/customers/bookings
// @access  Private (Customer)
export const getCustomerBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customerId: req.customer._id }).sort({ createdAt: -1 });
    new ApiResponse(200, 'Customer bookings retrieved successfully', bookings).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking for logged in customer
// @route   GET /api/customers/bookings/:id
// @access  Private (Customer)
export const getCustomerBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, customerId: req.customer._id });
    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }
    new ApiResponse(200, 'Booking retrieved successfully', booking).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get customer notifications
// @route   GET /api/customers/notifications
// @access  Private (Customer)
export const getCustomerNotifications = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.customer._id);
    if (!customer) {
      return next(new AppError('Customer not found', 404));
    }
    // Sort notifications newest first
    const sortedNotifs = customer.notifications.sort((a, b) => b.createdAt - a.createdAt);
    new ApiResponse(200, 'Notifications retrieved successfully', sortedNotifs).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PATCH /api/customers/notifications/:id/read
// @access  Private (Customer)
export const markNotificationRead = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.customer._id);
    if (!customer) {
      return next(new AppError('Customer not found', 404));
    }

    const notification = customer.notifications.id(req.params.id);
    if (notification) {
      notification.read = true;
      await customer.save();
    }
    
    new ApiResponse(200, 'Notification marked as read', customer.notifications.sort((a, b) => b.createdAt - a.createdAt)).send(res);
  } catch (error) {
    next(error);
  }
};
