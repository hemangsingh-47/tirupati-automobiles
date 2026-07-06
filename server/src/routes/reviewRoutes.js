import express from 'express';
import { getReviews, addReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getReviews)
  .post(addReview);

router.route('/:id')
  .patch(protect, admin, updateReview)
  .delete(protect, admin, deleteReview);

export default router;
