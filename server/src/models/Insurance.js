import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      default: null,
    },
    insuranceCompany: {
      type: String,
      required: [true, 'Please add the insurance company'],
    },
    policyNumber: {
      type: String,
      required: [true, 'Please add the policy number'],
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please add the policy expiry date'],
    },
    documentUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: [
        'Pending',
        'Documents Verified',
        'Quote Shared',
        'Customer Approved',
        'Policy Renewed',
        'Expired',
        'Cancelled'
      ],
      default: 'Pending',
    },
    notes: {
      type: String,
      default: '',
    },
    notified30Days: { type: Boolean, default: false },
    notified15Days: { type: Boolean, default: false },
    notified7Days: { type: Boolean, default: false },
    notifiedExpired: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Insurance = mongoose.model('Insurance', insuranceSchema);
export default Insurance;
