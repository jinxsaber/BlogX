import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDatabase() {
  console.log(MONGODB_URI);
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined. Please set it in your environment variables.');
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}