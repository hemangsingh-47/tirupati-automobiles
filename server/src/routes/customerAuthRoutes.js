import express from 'express';
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  updateCustomerProfile
} from '../controllers/customerAuthController.js';
import { protectCustomer } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router
  .route('/profile')
  .get(protectCustomer, getCustomerProfile)
  .put(protectCustomer, updateCustomerProfile);

export default router;
