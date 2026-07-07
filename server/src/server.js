import app from './app.js';
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import { initInsuranceCron } from './services/insuranceNotificationCron.js';

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  
  // Initialize Cron Jobs
  initInsuranceCron();
});
