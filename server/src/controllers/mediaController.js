import Media from '../models/Media.js';
import AppError from '../utils/AppError.js';
import { uploadMedia, deleteMedia } from '../utils/cloudinary.js';
import fs from 'fs';

export const createMedia = async (req, res, next) => {
  try {
    const { title, description, category, isFeatured, isPublished, showOnHomepage, expiryDate } = req.body;
    
    if (!req.file) {
      return next(new AppError('Please upload a file', 400));
    }

    const fileUrl = await uploadMedia(req.file.path);
    
    // Clean up local file
    fs.unlinkSync(req.file.path);

    const isPdf = req.file.mimetype === 'application/pdf';

    let parsedExpiryDate = undefined;
    if (expiryDate) {
      parsedExpiryDate = new Date(expiryDate);
      parsedExpiryDate.setHours(23, 59, 59, 999);
    }

    const media = await Media.create({
      title,
      description,
      category,
      fileType: isPdf ? 'pdf' : 'image',
      imageUrl: !isPdf ? fileUrl : undefined,
      pdfUrl: isPdf ? fileUrl : undefined,
      isFeatured: isFeatured === 'true',
      isPublished: isPublished === 'true',
      showOnHomepage: showOnHomepage === 'true',
      expiryDate: parsedExpiryDate,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: media,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const getMedia = async (req, res, next) => {
  try {
    const { category, type, isPublished, featured, search } = req.query;
    
    let query = {};
    
    if (category) query.category = category;
    if (type) query.fileType = type;
    if (isPublished !== undefined) query.isPublished = isPublished === 'true';
    if (featured === 'true') query.isFeatured = true;
    
    // Only return published and non-expired media for public users, unless it's an admin
    // We can infer if it's public if we don't have req.user, but we'll leave that to the route/controller setup
    // For this controller, we'll assume it's used by both, so we rely on `isPublished` query param
    // If it's public route, `isPublished` will be forced to true in the route definition or controller
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Handle expiry date (only show non-expired if filtering for public)
    if (isPublished === 'true') {
      query.$or = [
        { expiryDate: { $exists: false } },
        { expiryDate: null },
        { expiryDate: { $gt: new Date() } }
      ];
    }

    const media = await Media.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: media.length,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const getMediaById = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return next(new AppError('Media not found', 404));
    }

    res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMedia = async (req, res, next) => {
  try {
    const { title, description, category, isFeatured, isPublished, showOnHomepage, expiryDate } = req.body;
    
    let media = await Media.findById(req.params.id);
    
    if (!media) {
      if (req.file) fs.unlinkSync(req.file.path);
      return next(new AppError('Media not found', 404));
    }

    let parsedExpiryDate = media.expiryDate;
    if (expiryDate) {
      parsedExpiryDate = new Date(expiryDate);
      parsedExpiryDate.setHours(23, 59, 59, 999);
    }

    let updates = {
      title,
      description,
      category,
      isFeatured: isFeatured !== undefined ? isFeatured === 'true' || isFeatured === true : media.isFeatured,
      isPublished: isPublished !== undefined ? isPublished === 'true' || isPublished === true : media.isPublished,
      showOnHomepage: showOnHomepage !== undefined ? showOnHomepage === 'true' || showOnHomepage === true : media.showOnHomepage,
      expiryDate: parsedExpiryDate,
    };

    if (req.file) {
      // Delete old file
      const oldUrl = media.fileType === 'pdf' ? media.pdfUrl : media.imageUrl;
      if (oldUrl) {
        await deleteMedia(oldUrl);
      }
      
      const fileUrl = await uploadMedia(req.file.path);
      fs.unlinkSync(req.file.path);
      
      const isPdf = req.file.mimetype === 'application/pdf';
      updates.fileType = isPdf ? 'pdf' : 'image';
      updates.imageUrl = !isPdf ? fileUrl : undefined;
      updates.pdfUrl = isPdf ? fileUrl : undefined;
    }

    media = await Media.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const deleteMediaItem = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return next(new AppError('Media not found', 404));
    }

    const fileUrl = media.fileType === 'pdf' ? media.pdfUrl : media.imageUrl;
    if (fileUrl) {
      await deleteMedia(fileUrl);
    }

    await media.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const incrementDownload = async (req, res, next) => {
  try {
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!media) {
      return next(new AppError('Media not found', 404));
    }

    res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    next(error);
  }
};
