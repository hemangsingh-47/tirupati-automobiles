import express from 'express';
import {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMediaItem,
  incrementDownload
} from '../controllers/mediaController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getMedia);
router.get('/:id', getMediaById);
router.post('/:id/download', incrementDownload);

// Admin only routes
router.use(protect);
router.use(admin);

router.post('/', upload.single('file'), createMedia);
router.put('/:id', upload.single('file'), updateMedia);
router.delete('/:id', deleteMediaItem);

export default router;
