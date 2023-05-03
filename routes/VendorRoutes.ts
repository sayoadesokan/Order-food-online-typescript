import express, { Request, Response, NextFunction } from 'express';
import {
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from '../controllers';
<<<<<<< HEAD
import { Authenticate } from '../middleware/commonAuth';
import multer from 'multer';
=======
>>>>>>> parent of 28902bb (image upload added)

const router = express.Router();

router
<<<<<<< HEAD
  .use(Authenticate)
  .post('/loginnn', vendorLogin)
=======
  .post('/login', vendorLogin)
>>>>>>> parent of 28902bb (image upload added)
  .get('/profile', getVendorProfile)
  .patch('/profile', updateVendorProfile)
  .patch('/service', updateVendorService);

export { router as vendorRoutes };
