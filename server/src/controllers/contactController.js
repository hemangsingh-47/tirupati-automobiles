import Contact from '../models/Contact.js';

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res, next) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    const contact = await Contact.create({
      name,
      phone,
      email,
      message,
    });

    res.status(201).json(contact);
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
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
