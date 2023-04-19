import express, { Request, Response, NextFunction } from 'express';
import {
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from '../controllers';

const router = express.Router();

router
  .post('/login', vendorLogin)
  .get('/profile', getVendorProfile)
  .patch('/profile', updateVendorProfile)
  .patch('/service', updateVendorService);

export { router as vendorRoutes };
