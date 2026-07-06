import Review from '../models/Review.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

// @desc    Get all reviews (Admin sees all, Public sees approved)
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res, next) => {
  try {
    // If admin is logged in (passing token), we could return all.
    // For simplicity, we use a separate route or check query params.
    const filter = req.query.all === 'true' ? {} : { isApproved: true };
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    new ApiResponse(200, 'Reviews retrieved successfully', reviews).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a review
// @route   POST /api/reviews
// @access  Public
export const addReview = async (req, res, next) => {
  try {
    const { customerName, rating, comment } = req.body;
    const review = await Review.create({
      customerName,
      rating,
      comment
    });
    new ApiResponse(201, 'Review added successfully', review).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Update review status (Approve/Feature)
// @route   PATCH /api/reviews/:id
// @access  Private/Admin
export const updateReview = async (req, res, next) => {
  try {
    const { isApproved, isFeatured } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError('Review not found', 404));
    }

    const fields = Object.keys(req.body);
    fields.forEach(field => {
      review[field] = req.body[field];
    });

    const updatedReview = await review.save();
    new ApiResponse(200, 'Review updated successfully', updatedReview).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new AppError('Review not found', 404));
    }
    await review.deleteOne();
    new ApiResponse(200, 'Review removed', null).send(res);
  } catch (error) {
    next(error);
  }
};
