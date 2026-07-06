import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Please add a question'],
    },
    answer: {
      type: String,
      required: [true, 'Please add an answer'],
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

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
