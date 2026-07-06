import express from 'express';
import { getTeam, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/teamController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getTeam)
  .post(protect, admin, upload.single('image'), createTeamMember);

router.route('/:id')
  .patch(protect, admin, upload.single('image'), updateTeamMember)
  .delete(protect, admin, deleteTeamMember);

export default router;
