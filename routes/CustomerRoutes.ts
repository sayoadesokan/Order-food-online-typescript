import express, { Request, Response, NextFunction } from 'express';
import {
  customerLogin,
  customerSignUp,
  customerVerify,
  editCustomerProfile,
  getCustomerProfile,
  requestOTP,
} from '../controllers';

const router = express.Router();

/**----------------Signup/Create Customer -------------**/
router.post('/signup', customerSignUp);
/**----------------Login-------------**/
router.post('/login', customerLogin);

//Authentication

/**----------------Verify Customer Account -------------**/
router.patch('/verify', customerVerify);
/**----------------OTP/ Requesting OTP -------------**/
router.get('/otp', requestOTP);
/**----------------Profile -------------**/
router.get('/profile', getCustomerProfile);

router.patch('/profile', editCustomerProfile);

//cart
//order

//payment

export { router as CustomerRoutes };
