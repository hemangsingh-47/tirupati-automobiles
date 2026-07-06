import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  await mongoose.connect('mongodb+srv://Hemang_singh:hanu472008@cluster0.mdztwy4.mongodb.net/tirupati_automobiles?appName=Cluster0');
  const Booking = mongoose.connection.collection('bookings');
  const count = await Booking.countDocuments();
  console.log(`There are ${count} bookings in the old tirupati_automobiles database.`);
  process.exit();
}
check();
