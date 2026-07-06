import express from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, admin, upload.single('image'), createService);

router.route('/:id')
  .patch(protect, admin, upload.single('image'), updateService)
  .delete(protect, admin, deleteService);

export default router;
