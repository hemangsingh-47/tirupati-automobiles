import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';
import { uploadImage } from '../utils/cloudinary.js';
import Settings from '../models/Settings.js';
import { sendBookingConfirmation, sendAdminNotification, sendVehicleReadyNotification } from '../services/email.service.js';
import fs from 'fs';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res, next) => {
  try {
    const {
      customerName,
      phoneNumber,
      email,
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

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadImage(file.path);
        imageUrls.push(url);
        // Optionally delete the local file
        fs.unlinkSync(file.path);
      }
    }

    const booking = await Booking.create({
      customerName,
      phoneNumber,
      email,
      carBrand,
      carModel,
      manufacturingYear,
      fuelType,
      registrationNumber,
      serviceType,
      problemDescription,
      preferredDate,
      preferredTime,
      images: imageUrls,
      statusHistory: [{
        status: 'Booking Received',
        updatedBy: 'System',
        notes: 'Booking submitted successfully'
      }]
    });

    // Fetch settings to get workshop contact number
    let settings = await Settings.findOne();
    const workshopContactNumber = settings?.phone || '+91 98765 43210';
    const adminEmail = settings?.email || process.env.EMAIL_FROM || 'admin@tirupatiautomobiles.com';

    // Send email to Customer
    if (email) {
      await sendBookingConfirmation(email, {
        customerName,
        bookingId: booking._id,
        carBrand,
        carModel,
        registrationNumber,
        serviceType,
        preferredDate,
        preferredTime,
        workshopContactNumber
      });
    }

    // Send email to Admin
    await sendAdminNotification(adminEmail, {
      customerName,
      phone: phoneNumber,
      carBrand,
      carModel,
      registrationNumber,
      serviceType,
      problemDescription,
      bookingId: booking._id,
      preferredDate,
      preferredTime
    });

    new ApiResponse(201, 'Booking created successfully', booking).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings (with pagination & filters)
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    let query = {};

    // Filters
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.serviceType) {
      query.serviceType = req.query.serviceType;
    }
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { customerName: searchRegex },
        { phoneNumber: searchRegex },
        { registrationNumber: searchRegex },
      ];
    }
    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const totalRecords = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    new ApiResponse(200, 'Bookings retrieved successfully', bookings, {
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords
    }).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }
    new ApiResponse(200, 'Booking retrieved successfully', booking).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }

    booking.status = status;
    booking.statusHistory.push({
      status,
      updatedBy: req.user ? req.user.name : 'Admin',
      notes: notes || `Status updated to ${status}`
    });

    const updatedBooking = await booking.save();

    // Create Notification for Customer if linked
    if (booking.customerId) {
      const customer = await Customer.findById(booking.customerId);
      if (customer) {
        let notifType = 'info';
        if (status === 'Delivered') notifType = 'success';
        if (status === 'Waiting For Parts') notifType = 'warning';
        
        customer.notifications.push({
          message: `Your vehicle (${booking.carBrand} ${booking.carModel}) status is now: ${status}. ${notes || ''}`,
          type: notifType,
          bookingId: booking._id
        });
        await customer.save();
      }
    }

    // Send Vehicle Ready Email
    if (status === 'Ready For Delivery' && booking.email) {
      let settings = await Settings.findOne();
      const workshopContactNumber = settings?.phone || '+91 98765 43210';
      await sendVehicleReadyNotification(booking.email, {
        customerName: booking.customerName,
        carBrand: booking.carBrand,
        carModel: booking.carModel,
        registrationNumber: booking.registrationNumber,
        workshopContactNumber
      });
    }

    new ApiResponse(200, 'Booking status updated successfully', updatedBooking).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }
    await booking.deleteOne();
    new ApiResponse(200, 'Booking removed successfully', null).send(res);
  } catch (error) {
    next(error);
  }
};
