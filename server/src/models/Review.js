import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Please add a name'],
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Please add a review comment'],
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
