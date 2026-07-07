import express from 'express';
import {
  renewInsurance,
  getCustomerInsurance,
  getAdminInsurance,
  updateInsuranceStatus,
  getVehicleProfile
} from '../controllers/insuranceController.js';
import { protect, admin, protectCustomer } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public / Customer Routes
router.post('/renew', renewInsurance);

// Customer Portal Routes
router.get('/customer', protectCustomer, getCustomerInsurance);

// Admin Routes
router.get('/admin', protect, admin, getAdminInsurance);
router.patch('/admin/:id/status', protect, admin, updateInsuranceStatus);

// Vehicle Profile Route (Accessible by Admin and Customer - need custom middleware or just protect both, for now let's use protect since admin needs it, we can expose a separate customer vehicle route later)
router.get('/vehicles/:idOrReg', getVehicleProfile);

export default router;
