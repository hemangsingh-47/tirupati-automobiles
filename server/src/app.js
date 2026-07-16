import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import logger from './utils/logger.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import customerAuthRoutes from './routes/customerAuthRoutes.js';
import customerBookingRoutes from './routes/customerBookingRoutes.js';
import insuranceRoutes from './routes/insuranceRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';

dotenv.config();

const app = express();

// Trust proxy for rate limiter (needed when behind Vite proxy or Nginx)
app.set('trust proxy', 1);

app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: process.env.FRONTEND_URL 
    ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'] 
    : '*',
  credentials: true,
}));

const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// Compress API responses
app.use(compression());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting (1000 requests per hour)
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, 
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/customers/auth', customerAuthRoutes);
app.use('/api/customers/bookings', customerBookingRoutes);
app.use('/api/media', mediaRoutes);

app.get('/', (req, res) => {
  res.send('Tirupati Automobiles API is running...');
});

// Health check for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Handle 404 errors for unknown routes
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
