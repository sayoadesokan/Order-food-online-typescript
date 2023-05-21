import { Request, Response, NextFunction } from 'express';
import { editVendorInput, vendorLoginInputs } from '../dto/Index';
import { vendor } from '../models/Vendor';
import { findVendor } from './AdminController';
import { generateSignature, validatePassword } from '../utils';
import { createFood } from '../dto/Food.dto';
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
          foodType: existingVendor.foodType,
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
    console.log('here');

    if (user) {
      const existingVendor = await findVendor(user._id);
      console.log(existingVendor);
      return res.json(existingVendor);
    }

    return res.json({ message: 'vendor Information Not Found' });
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
    const { name, address, phone, foodTypes } = <editVendorInput>req.body;

    const user = req.body;

    if (user) {
      const existingVendor = await findVendor(user._id);

      if (existingVendor !== null) {
        existingVendor.name = name;
        existingVendor.address = address;
        existingVendor.phone = phone;
        existingVendor.foodType = foodTypes;

        const savedResult = await existingVendor.save();
        return res.json(savedResult);
      }

      return res.json(existingVendor);
    }

    return res.json({ message: 'Vendor information not found' });
  } catch (error) {
    console.log(error);
  }
};

export const updateVendorCoverProfile = async (
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

        return res.json(result);
      }
    }

    return res.json('Something went wrong when adding food');
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
        const savedResult = await existingVendor.save();
        return res.json(savedResult);
      }
    }
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
        createFood
      >req.body;
      const vendor = await findVendor(user._id);

      if (vendor !== null) {
        const files = req.files as [Express.Multer.File];

        // const images = files.map((file: Express.Multer.File) => file.filename);

        const createdFood = await Food.create({
          vendorId: vendor._id,
          name: name,
          description: description,
          category: category,
          foodType: foodType,
          // images: images,
          readyTime: readyTime,
          price: price,
          rating: 0,
        });

        vendor.foods.push(createdFood); // push the _id property instead
        const result = await vendor.save();

        return res.json(result);
      }
    }

    return res.json('Something went wrong when adding food');
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
