import express from 'express';
<<<<<<< HEAD
import App from './services/ExpressApp';
import dbConnection from './services/Database';
=======
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
>>>>>>> parent of 28902bb (image upload added)

const startServer = async () => {
  const app = express();

  await dbConnection();

  await App(app);

  app.listen(8800, () => {
    console.log(`Listening on port http://localhost:8800`);
  });
};

startServer();
