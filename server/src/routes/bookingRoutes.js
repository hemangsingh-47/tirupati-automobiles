import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .post(upload.array('images', 5), createBooking)
  .get(protect, getBookings);

router.route('/:id')
  .get(protect, getBookingById)
  .delete(protect, deleteBooking);

router.route('/:id/status')
  .patch(protect, updateBookingStatus);

export default router;
