import WebsiteContent from '../models/WebsiteContent.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Get website content
// @route   GET /api/content
// @access  Public
export const getContent = async (req, res, next) => {
  try {
    let content = await WebsiteContent.findOne();
    if (!content) {
      content = await WebsiteContent.create({}); // Create default if it doesn't exist
    }
    new ApiResponse(200, 'Content retrieved successfully', content).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Update website content
// @route   PATCH /api/content
// @access  Private/Admin
export const updateContent = async (req, res, next) => {
  try {
    let content = await WebsiteContent.findOne();
    if (!content) {
      content = await WebsiteContent.create({});
    }

    // Update fields
    const fields = Object.keys(req.body);
    fields.forEach(field => {
      content[field] = req.body[field];
    });

    const updatedContent = await content.save();
    new ApiResponse(200, 'Content updated successfully', updatedContent).send(res);
  } catch (error) {
    next(error);
  }
};
