import Booking from '../models/Booking.js';

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

    const images = req.files ? req.files.map(file => file.filename) : [];

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
      images,
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }
    res.json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    booking.status = status || booking.status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
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
      res.status(404);
      throw new Error('Booking not found');
    }
    await booking.deleteOne();
    res.json({ message: 'Booking removed' });
  } catch (error) {
    next(error);
  }
};
