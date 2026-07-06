import Service from '../models/Service.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
  try {
    const query = req.query.admin === 'true' ? {} : { isActive: true };
    const services = await Service.find(query).sort({ displayOrder: 1, createdAt: -1 });
    new ApiResponse(200, 'Services retrieved successfully', services).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res, next) => {
  try {
    const serviceData = { ...req.body };
    if (req.file) {
      serviceData.imageUrl = req.file.filename;
    }
    const service = await Service.create(serviceData);
    new ApiResponse(201, 'Service created successfully', service).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a service
// @route   PATCH /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res, next) => {
  try {
    const serviceData = { ...req.body };
    if (req.file) {
      serviceData.imageUrl = req.file.filename;
    }
    const service = await Service.findByIdAndUpdate(req.params.id, serviceData, { new: true, runValidators: true });
    if (!service) {
      return next(new AppError('Service not found', 404));
    }
    new ApiResponse(200, 'Service updated successfully', service).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return next(new AppError('Service not found', 404));
    }
    await service.deleteOne();
    new ApiResponse(200, 'Service removed successfully', null).send(res);
  } catch (error) {
    next(error);
  }
};
