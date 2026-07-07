import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: [true, 'Please add the vehicle registration number'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      default: null,
    },
    brand: {
      type: String,
      required: [true, 'Please add the vehicle brand'],
    },
    model: {
      type: String,
      required: [true, 'Please add the vehicle model'],
    },
    manufacturingYear: {
      type: String,
    },
    fuelType: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
