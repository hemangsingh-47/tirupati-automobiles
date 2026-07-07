import Insurance from '../models/Insurance.js';
import { sendInsuranceReminder } from './email.service.js'; // We will add this
import logger from '../utils/logger.js';
import mongoose from 'mongoose';

// Calculate days between two dates
const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000; 
  return Math.round((date1 - date2) / oneDay);
};

export const runDailyInsuranceCheck = async () => {
  logger.info('Running daily insurance expiry check...');
  
  try {
    const today = new Date();
    // Get all insurances that are not renewed/cancelled and not expired yet (we'll also check if just expired)
    const activeInsurances = await Insurance.find({
      status: { $nin: ['Policy Renewed', 'Cancelled'] }
    }).populate('customerId').populate('vehicleId');

    for (const insurance of activeInsurances) {
      if (!insurance.expiryDate || !insurance.customerId || !insurance.customerId.email) continue;

      const daysLeft = daysBetween(new Date(insurance.expiryDate), today);
      const customer = insurance.customerId;
      const vehicle = insurance.vehicleId;

      let templateType = null;
      let shouldNotify = false;

      // 30 Days Reminder
      if (daysLeft <= 30 && daysLeft > 15 && !insurance.notified30Days) {
        templateType = '30_DAYS';
        insurance.notified30Days = true;
        shouldNotify = true;
      }
      // 15 Days Reminder
      else if (daysLeft <= 15 && daysLeft > 7 && !insurance.notified15Days) {
        templateType = '15_DAYS';
        insurance.notified15Days = true;
        shouldNotify = true;
      }
      // 7 Days Reminder
      else if (daysLeft <= 7 && daysLeft > 0 && !insurance.notified7Days) {
        templateType = '7_DAYS';
        insurance.notified7Days = true;
        shouldNotify = true;
      }
      // Expired
      else if (daysLeft <= 0 && !insurance.notifiedExpired) {
        templateType = 'EXPIRED';
        insurance.notifiedExpired = true;
        insurance.status = 'Expired'; // Auto update status
        shouldNotify = true;
      }

      if (shouldNotify) {
        await sendInsuranceReminder(customer.email, {
          name: customer.name,
          registrationNumber: vehicle?.registrationNumber,
          policyNumber: insurance.policyNumber,
          expiryDate: insurance.expiryDate,
          daysLeft,
          type: templateType
        });
        await insurance.save();
        logger.info(`Sent ${templateType} insurance reminder to ${customer.email} for vehicle ${vehicle?.registrationNumber}`);
      }
    }
  } catch (error) {
    logger.error('Error in insurance notification cron:', error);
  }
};

export const initInsuranceCron = () => {
  // Run once immediately on startup
  setTimeout(() => {
    runDailyInsuranceCheck();
  }, 10000); // 10s delay

  // Run every 24 hours
  setInterval(() => {
    runDailyInsuranceCheck();
  }, 24 * 60 * 60 * 1000);
};
