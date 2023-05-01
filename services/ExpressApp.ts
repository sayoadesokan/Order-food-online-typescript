import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

import { vendorRoutes } from '../routes/VendorRoutes';
import { AdminRoutes } from '../routes/AdminRoutes';

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use('/admin', AdminRoutes);
  app.use('/vendor', vendorRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

  return app;
};
