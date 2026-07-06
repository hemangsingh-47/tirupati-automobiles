import TeamMember from '../models/TeamMember.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const getTeam = async (req, res, next) => {
  try {
    const query = req.query.admin === 'true' ? {} : { isActive: true };
    const team = await TeamMember.find(query).sort({ displayOrder: 1, createdAt: 1 });
    new ApiResponse(200, 'Team members retrieved successfully', team).send(res);
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.imageUrl = req.file.filename;
    }
    const member = await TeamMember.create(data);
    new ApiResponse(201, 'Team member created successfully', member).send(res);
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.imageUrl = req.file.filename;
    }
    const member = await TeamMember.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!member) {
      return next(new AppError('Team member not found', 404));
    }
    new ApiResponse(200, 'Team member updated successfully', member).send(res);
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return next(new AppError('Team member not found', 404));
    }
    await member.deleteOne();
    new ApiResponse(200, 'Team member removed successfully', null).send(res);
  } catch (error) {
    next(error);
  }
};
