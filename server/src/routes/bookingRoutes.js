import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookingController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .post(upload.array('images', 5), createBooking)
  .get(getBookings);

router.route('/:id')
  .get(getBookingById)
  .delete(deleteBooking);

router.route('/:id/status')
  .patch(updateBookingStatus);

export default router;
