import Insurance from '../models/Insurance.js';
import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';
import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/AppError.js';

// @desc    Submit new insurance renewal request
// @route   POST /api/insurance/renew
// @access  Private (Customer) or Public
export const renewInsurance = async (req, res, next) => {
  try {
    const {
      registrationNumber, brand, model, manufacturingYear, fuelType,
      insuranceCompany, policyNumber, expiryDate, documentUrl, notes
    } = req.body;

    const customerId = req.user?._id || null;

    if (!registrationNumber || !brand || !model || !insuranceCompany || !policyNumber || !expiryDate) {
      return next(new AppError('Please provide all required vehicle and policy fields', 400));
    }

    const regNoUpper = registrationNumber.toUpperCase().trim();

    // Upsert Vehicle
    let vehicle = await Vehicle.findOne({ registrationNumber: regNoUpper });
    if (vehicle) {
      // Update missing fields if possible
      vehicle.brand = vehicle.brand || brand;
      vehicle.model = vehicle.model || model;
      if (customerId && !vehicle.customerId) vehicle.customerId = customerId;
      await vehicle.save();
    } else {
      vehicle = await Vehicle.create({
        registrationNumber: regNoUpper,
        brand,
        model,
        manufacturingYear,
        fuelType,
        customerId
      });
    }

    // Create Insurance Record
    const insurance = await Insurance.create({
      vehicleId: vehicle._id,
      customerId: customerId,
      insuranceCompany,
      policyNumber,
      expiryDate,
      documentUrl,
      notes,
      status: 'Pending'
    });

    new ApiResponse(201, 'Insurance renewal request submitted successfully', insurance).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all insurance records for logged-in customer
// @route   GET /api/insurance/customer
// @access  Private (Customer)
export const getCustomerInsurance = async (req, res, next) => {
  try {
    const insuranceRecords = await Insurance.find({ customerId: req.user._id })
      .populate('vehicleId')
      .sort({ createdAt: -1 });

    new ApiResponse(200, 'Customer insurance records retrieved', insuranceRecords).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all insurance records (Admin)
// @route   GET /api/insurance/admin
// @access  Private (Admin)
export const getAdminInsurance = async (req, res, next) => {
  try {
    const insuranceRecords = await Insurance.find({})
      .populate('vehicleId')
      .populate('customerId', 'name email phone')
      .sort({ createdAt: -1 });

    new ApiResponse(200, 'All insurance records retrieved', insuranceRecords).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Update insurance renewal status (Admin)
// @route   PATCH /api/insurance/admin/:id/status
// @access  Private (Admin)
export const updateInsuranceStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return next(new AppError('Please provide a status to update', 400));
    }

    const insurance = await Insurance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('vehicleId');

    if (!insurance) {
      return next(new AppError('Insurance record not found', 404));
    }

    new ApiResponse(200, `Status updated to ${status}`, insurance).send(res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get vehicle profile by ID or Registration Number
// @route   GET /api/insurance/vehicles/:idOrReg
// @access  Private
export const getVehicleProfile = async (req, res, next) => {
  try {
    const { idOrReg } = req.params;
    let vehicle;

    // Check if valid ObjectId
    if (idOrReg.match(/^[0-9a-fA-F]{24}$/)) {
      vehicle = await Vehicle.findById(idOrReg);
    } else {
      vehicle = await Vehicle.findOne({ registrationNumber: idOrReg.toUpperCase().trim() });
    }

    if (!vehicle) {
      return next(new AppError('Vehicle not found', 404));
    }

    // Fetch related insurance records
    const insuranceRecords = await Insurance.find({ vehicleId: vehicle._id }).sort({ createdAt: -1 });
    
    // Fetch related bookings using the registration number (since old bookings might not have vehicleId)
    const bookings = await Booking.find({ 
      registrationNumber: new RegExp(`^${vehicle.registrationNumber}$`, 'i') 
    }).sort({ createdAt: -1 });

    const vehicleProfile = {
      vehicle,
      insuranceRecords,
      bookings
    };

    new ApiResponse(200, 'Vehicle profile retrieved', vehicleProfile).send(res);
  } catch (error) {
    next(error);
  }
};
