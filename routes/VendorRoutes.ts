import express, { Request, Response, NextFunction } from 'express';
import {
  addFood,
  getFood,
  getVendorProfile,
  updateCoverProfile,
  updateVendorProfile,
  updateVendorService,
  vendorLogin,
} from '../controllers';
import { Authenticate } from '../middleware/commonAuth';
import multer from 'multer'; //npm install multer @types/multer

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '_' + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array('images', 10);

router
  .use(Authenticate)
  .post('/login', vendorLogin)
  .get('/profile', getVendorProfile)
  .patch('/profile', updateVendorProfile)
  .patch('/service', updateVendorService)
  .patch('/coverImage', images, updateCoverProfile)
  .post('/food', images, addFood)
  .get('/foods', getFood);

export { router as vendorRoutes };
