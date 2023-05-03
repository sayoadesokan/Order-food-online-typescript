import express, { Request, Response, NextFunction } from 'express';
import {
  getVendorProfile,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from '../controllers';
<<<<<<< HEAD
import { Authenticate } from '../middleware/commonAuth';
<<<<<<< HEAD
import multer from 'multer';
=======
>>>>>>> parent of 28902bb (image upload added)
=======
import multer from 'multer'; //npm install multer @types/multer
>>>>>>> parent of 572b0fe (errors)

const router = express.Router();

router
<<<<<<< HEAD
  .use(Authenticate)
<<<<<<< HEAD
  .post('/loginnn', vendorLogin)
=======
  .post('/login', vendorLogin)
>>>>>>> parent of 28902bb (image upload added)
=======
  .post('/login', vendorLogin)
>>>>>>> parent of 572b0fe (errors)
  .get('/profile', getVendorProfile)
  .patch('/profile', updateVendorProfile)
  .patch('/service', updateVendorService);

export { router as vendorRoutes };
