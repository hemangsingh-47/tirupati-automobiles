import Settings from '../models/Settings.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Get settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    
    // If no settings document exists, create the default one
    if (!settings) {
      settings = await Settings.create({});
    }

    new ApiResponse(200, 'Settings retrieved successfully', settings).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Update settings
// @route   PATCH /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    // Update fields dynamically based on request body
    const fields = [
      'businessName', 'tagline', 'phone', 'email', 'address', 
      'hoursWeekdays', 'hoursWeekend', 'facebook', 'instagram', 'whatsapp', 'googleMapsLink'
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    const updatedSettings = await settings.save();
    new ApiResponse(200, 'Settings updated successfully', updatedSettings).send(res);
  } catch (error) {
    next(error);
  }
};
