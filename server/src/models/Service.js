import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a service title'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please add a short description'],
    },
    fullDescription: {
      type: String,
    },
    icon: {
      type: String, // String identifier for lucide-react icon (e.g., 'Wrench', 'Car')
      default: 'Wrench',
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
      enum: ['General Service', 'Repairs & Denting', 'Detailing & Cleaning', 'Inspection & Support'],
      default: 'General Service'
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
