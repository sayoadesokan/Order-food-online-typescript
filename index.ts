import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { vendorRoutes } from './routes/VendorRoutes';
import { AdminRoutes } from './routes/AdminRoutes';
import { MONGO_URI } from './config/Index';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/admin', AdminRoutes);
app.use('/vendor', vendorRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to Database');
    app.listen(8800, () => {
      console.log(`Listening on port http://localhost:8888`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
