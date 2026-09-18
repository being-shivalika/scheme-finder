
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    console.error('MongoDB connection error: Please define the MONGODB_URI environment variable in your deployment platform.');
    return null;
  }

  if (!cached.promise) {
    console.log("Attempting to connect to MongoDB...");
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('Successfully connected to MongoDB!');
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e.message);
  }
  
  return cached.conn;
};
