import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Please add your name'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add your phone number'],
    },
    email: {
      type: String,
      required: [true, 'Please add your email'],
    },
    carBrand: {
      type: String,
      required: [true, 'Please add the car brand'],
    },
    carModel: {
      type: String,
      required: [true, 'Please add the car model'],
    },
    manufacturingYear: {
      type: String,
      required: [true, 'Please add the manufacturing year'],
    },
    fuelType: {
      type: String,
      required: [true, 'Please add the fuel type'],
    },
    registrationNumber: {
      type: String,
      required: [true, 'Please add the registration number'],
    },
    serviceType: {
      type: String,
      required: [true, 'Please select a service type'],
    },
    problemDescription: {
      type: String,
    },
    preferredDate: {
      type: Date,
      required: [true, 'Please select a preferred date'],
    },
    preferredTime: {
      type: String,
      required: [true, 'Please select a preferred time'],
    },
    status: {
      type: String,
      enum: [
        'Booking Received',
        'Vehicle Received',
        'Inspection',
        'Repair Started',
        'Painting',
        'Quality Check',
        'Ready For Delivery',
        'Delivered'
      ],
      default: 'Booking Received',
    },
    images: [
      {
        type: String,
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
