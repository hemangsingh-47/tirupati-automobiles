import express from 'express';
import { getContent, updateContent } from '../controllers/contentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getContent)
  .patch(protect, admin, updateContent);

export default router;
