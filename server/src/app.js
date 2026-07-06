import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { errorHandler } from './middleware/errorMiddleware.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'server/uploads')));

app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Tirupati Automobiles API is running...');
});

app.use(errorHandler);

export default app;
