import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, 'Please provide an image URL/path'],
    },
    title: {
      type: String,
    },
    category: {
      type: String,
      enum: ['Workshop', 'Repairs', 'Before/After', 'Events'],
      default: 'Workshop'
    },
    displayOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
