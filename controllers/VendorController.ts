import { Request, Response, NextFunction } from 'express';
import { vendorLoginInputs } from '../dto/Index';
import { vendor } from '../models/Vendor';
import { findVendor } from './AdminController';
import { generateSignature, validatePassword } from '../utils';

export const vendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('here!');
    const { email, password } = <vendorLoginInputs>req.body;

    const existingVendor = await findVendor('', email);
    console.log(existingVendor);

    if (existingVendor) {
      const validation = await validatePassword(
        password,
        existingVendor.password,
        existingVendor.salt
      );

      if (validation) {
        const signature = await generateSignature({
          _id: existingVendor.id,
          email: existingVendor.email,
          foodType: existingVendor.foodType,
          name: existingVendor.name,
        });

        console.log('meant to be SIGNATURE');
        return res.json({ signature });
      } else {
        res.json({ message: 'password is not correct' });
      }
    }

    return res.json({
      message: 'Login with a different username and password',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const updateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const updateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
