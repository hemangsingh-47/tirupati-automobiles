import express from 'express';
import { getGallery, addGalleryImage, deleteGalleryImage, updateGalleryImage } from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(protect, admin, upload.single('image'), addGalleryImage);

router.route('/:id')
  .patch(protect, admin, updateGalleryImage)
  .delete(protect, admin, deleteGalleryImage);

export default router;
