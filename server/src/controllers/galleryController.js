import Gallery from '../models/Gallery.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';
import fs from 'fs';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res, next) => {
  try {
    const images = await Gallery.find({}).sort({ displayOrder: 1, createdAt: -1 });
    new ApiResponse(200, 'Gallery images retrieved successfully', images).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Add new gallery image
// @route   POST /api/gallery
// @access  Private/Admin
export const addGalleryImage = async (req, res, next) => {
  try {
    const { title, category } = req.body;
    
    if (!req.file) {
      return next(new AppError('Please upload an image', 400));
    }

    const imageUrl = await uploadImage(req.file.path);
    fs.unlinkSync(req.file.path);

    const image = await Gallery.create({
      imageUrl,
      title,
      category
    });

    new ApiResponse(201, 'Gallery image added successfully', image).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery image (for reordering etc)
// @route   PATCH /api/gallery/:id
// @access  Private/Admin
export const updateGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return next(new AppError('Image not found', 404));
    }
    
    const fields = Object.keys(req.body);
    fields.forEach(field => {
      image[field] = req.body[field];
    });

    const updatedImage = await image.save();
    new ApiResponse(200, 'Image updated successfully', updatedImage).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req, res, next) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return next(new AppError('Image not found', 404));
    }
    
    // Delete from cloudinary
    if (image.imageUrl) {
      await deleteImage(image.imageUrl);
    }
    
    await image.deleteOne();
    new ApiResponse(200, 'Image removed', null).send(res);
  } catch (error) {
    next(error);
  }
};
