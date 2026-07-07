import Contact from '../models/Contact.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';
import { sendContactThankYou } from '../services/email.service.js';

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res, next) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return next(new AppError('Please fill in all required fields', 400));
    }

    const contact = await Contact.create({
      name,
      phone,
      email,
      message,
    });

    // Send Thank You email to Customer
    await sendContactThankYou(email, { name });

    new ApiResponse(201, 'Contact message sent successfully', contact).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    new ApiResponse(200, 'Contacts retrieved successfully', contacts).send(res);
  } catch (error) {
    next(error);
  }
};
