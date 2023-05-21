import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import {
  addFood,
  getFood,
  getVendorProfile,
  updateVendorCoverProfile,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from '../controllers';

import { Authenticate } from '../middleware/commonAuth';
const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '_' + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array('images', 10);

router
  .post('/login', vendorLogin)
  .use(Authenticate)
  .get('/profile', getVendorProfile)
  .patch('/profile', updateVendorProfile)
  .patch('/coverimage', images, updateVendorCoverProfile)
  .patch('/service', updateVendorService)
  .post('/food', images, addFood)
  .get('/foods', getFood);

export { router as vendorRoutes };
