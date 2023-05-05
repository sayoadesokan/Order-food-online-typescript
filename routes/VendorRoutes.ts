import express, { Request, Response, NextFunction } from 'express';
import {
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from '../controllers';
import { Authenticate } from '../middleware/commonAuth';
import multer from 'multer';
const router = express.Router();

router
  // .use(Authenticate)
  .post('/login', vendorLogin)
  .get('/profile', getVendorProfile)
  .patch('/profile', updateVendorProfile)
  .patch('/service', updateVendorService);

export { router as vendorRoutes };
