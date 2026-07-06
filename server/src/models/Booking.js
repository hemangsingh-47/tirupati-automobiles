import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      default: null, // Allow guest bookings
    },
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
        'Waiting For Parts',
        'Repair Started',
        'Painting',
        'Quality Check',
        'Ready For Delivery',
        'Delivered'
      ],
      default: 'Booking Received',
    },
    statusHistory: [
      {
        status: String,
        updatedBy: String,
        date: { type: Date, default: Date.now },
        notes: String
      }
    ],
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
