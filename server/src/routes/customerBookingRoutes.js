import express from 'express';
import {
  createCustomerBooking,
  getCustomerBookings,
  getCustomerBookingById,
  getCustomerNotifications,
  markNotificationRead
} from '../controllers/customerBookingController.js';
import { protectCustomer } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(protectCustomer, getCustomerBookings)
  .post(protectCustomer, upload.array('images', 5), createCustomerBooking);

router.get('/notifications', protectCustomer, getCustomerNotifications);
router.patch('/notifications/:id/read', protectCustomer, markNotificationRead);

router.route('/:id')
  .get(protectCustomer, getCustomerBookingById);

export default router;
