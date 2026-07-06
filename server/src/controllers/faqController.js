import FAQ from '../models/FAQ.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

export const getFaqs = async (req, res, next) => {
  try {
    const query = req.query.admin === 'true' ? {} : { isActive: true };
    const faqs = await FAQ.find(query).sort({ displayOrder: 1, createdAt: 1 });
    new ApiResponse(200, 'FAQs retrieved successfully', faqs).send(res);
  } catch (error) {
    next(error);
  }
};

export const createFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    new ApiResponse(201, 'FAQ created successfully', faq).send(res);
  } catch (error) {
    next(error);
  }
};

export const updateFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) {
      return next(new AppError('FAQ not found', 404));
    }
    new ApiResponse(200, 'FAQ updated successfully', faq).send(res);
  } catch (error) {
    next(error);
  }
};

export const deleteFaq = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return next(new AppError('FAQ not found', 404));
    }
    await faq.deleteOne();
    new ApiResponse(200, 'FAQ removed successfully', null).send(res);
  } catch (error) {
    next(error);
  }
};
