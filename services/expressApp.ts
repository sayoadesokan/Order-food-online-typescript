import express, { Application } from 'express';
import cors from 'cors';

import { vendorRoutes } from '../routes/VendorRoutes';
import { AdminRoutes } from '../routes/AdminRoutes';

import path from 'path';
import { shoppingRoute } from '../routes/ShoppingRoutes';

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/admin', AdminRoutes);
  app.use('/vendor', vendorRoutes);
  app.use(shoppingRoute);

  return app;
};
