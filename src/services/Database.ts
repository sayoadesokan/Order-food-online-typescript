import mongoose from 'mongoose';
import { MONGO_URI } from '../config/Index';

export default async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
  }
};
