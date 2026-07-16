import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Offers', 'Announcements', 'Workshop News', 'Certificates', 'Insurance Documents', 'Price Lists', 'Brochures', 'Events', 'General'],
    default: 'General',
  },
  fileType: {
    type: String,
    enum: ['image', 'pdf'],
    required: true,
  },
  imageUrl: {
    type: String,
  },
  pdfUrl: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  showOnHomepage: {
    type: Boolean,
    default: false,
  },
  expiryDate: {
    type: Date,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);

export default Media;
