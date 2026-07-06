import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './server/src/models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@tirupatiautomobiles.com' });
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }

    const adminUser = new User({
      name: 'Owner Admin',
      email: 'admin@tirupatiautomobiles.com',
      password: 'password123',
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully: admin@tirupatiautomobiles.com / password123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
