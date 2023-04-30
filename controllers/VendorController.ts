import { Request, Response, NextFunction } from 'express';
import { editVendorInputs, vendorLoginInputs } from '../dto/Index';
import { vendor } from '../models/Vendor';
import { findVendor } from './AdminController';
import { generateSignature, validatePassword } from '../utils';
import { createFoodInputs } from '../dto/Food.dto';
import { Food } from '../models/Food';

export const vendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = <vendorLoginInputs>req.body;

    const existingVendor = await findVendor('', email);

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
          name: existingVendor.name,
        });

        return res.json(signature);
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
    const user = req.user;

    if (user) {
      const existingVendor = await findVendor(user._id);
      return res.json(existingVendor);
    }

    return res.json({
      message: 'User not authorized',
    });
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
    const { name, address, phone, foodType } = <editVendorInputs>req.body;
    const user = req.user;

    if (user) {
      const existingVendor = await findVendor(user._id);
      if (existingVendor !== null) {
        existingVendor.name = name;
        existingVendor.address = address;
        existingVendor.phone = phone;
        existingVendor.foodType = foodType;

        const updatedVendor = await existingVendor.save();
        return res.json(updatedVendor);
      }
    }

    return res.json({
      message: 'User not authorized',
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCoverProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (user) {
      const vendor = await findVendor(user._id);

      if (vendor !== null) {
        const files = req.files as [Express.Multer.File];

        const images = files.map((file: Express.Multer.File) => file.filename);

        vendor.coverImage.push(...images);

        const result = await vendor.save();
      }
    }
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
    const user = req.user;

    if (user) {
      const existingVendor = await findVendor(user._id);
      if (existingVendor !== null) {
        existingVendor.serviceAvailable = !existingVendor.serviceAvailable;

        const updatedVendor = await existingVendor.save();
        return res.json(updatedVendor);
      }
    }

    return res.json({
      message: 'User not authorized',
    });
  } catch (error) {
    console.log(error);
  }
};

export const addFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (user) {
      const { name, description, category, foodType, readyTime, price } = <
        createFoodInputs
      >req.body;

      const vendor = await findVendor(user._id);

      if (vendor !== null) {
        const files = req.files as [Express.Multer.File];

        const images = files.map((file: Express.Multer.File) => file.filename);

        const createdFood = await Food.create({
          vendorId: vendor._id,
          name: name,
          description: description,
          category: category,
          foodType: foodType,
          images: images,
          readyTime: readyTime,
          price: price,
          rating: 0,
        });

        vendor.foods.push(createdFood._id); // push the _id property instead
        const result = await vendor.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (user) {
      const foods = await Food.find({ vendorId: user._id });

      if (foods !== null) {
        return res.json(foods);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
