
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log('Successfully connected to MongoDB!');
  } catch (err) {
    console.error('MongoDB connection error. This usually means your IP address is not whitelisted in MongoDB Atlas. Go to Network Access and add 0.0.0.0/0.', err.message);
  }
};
