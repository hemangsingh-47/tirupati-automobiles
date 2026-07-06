import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    address: {
      type: String,
      default: '',
    },
    profilePicture: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notifications: [
      {
        message: String,
        type: {
          type: String,
          enum: ['info', 'success', 'warning', 'error'],
          default: 'info'
        },
        read: {
          type: Boolean,
          default: false
        },
        bookingId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Booking'
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
customerSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
