import { Request, Response, NextFunction } from 'express';
import { createVendorInput } from '../dto/Index';
import { vendor } from '../models/Vendor';
import { generatePassword, generateSalt } from '../utils';

export const findVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await vendor.findOne({ email: email });
  } else {
    return await vendor.findById(id);
  }
};

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    phone,
    pinCode,
    foodType,
    email,
    password,
    ownerName,
  } = <createVendorInput>req.body;

  const existingVendor = await vendor.findOne({ email: email });

  if (existingVendor) {
    return res.json({ message: 'User already exist' });
  }

  //install bcrypt (npm i bcrypt, @types/bcrypt, npm i --save-dev @types/bcrypt)
  //generate a salt
  const salt = await generateSalt();
  //encrypt the password using the salt
  const userPassword = await generatePassword(password, salt);

  const createVendor = await vendor.create({
    name: name,
    address: address,
    pinCode: pinCode,
    foodType: foodType,
    email: email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImage: [],
    foods: [],
  });

  return res.status(200).json(createVendor);
};

export const getVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendors = await vendor.find();
    if (!vendors) {
      res.json({ message: 'no vendor available' });
    }

    res.json(vendors);
  } catch (error) {
    console.log(error);
  }
};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendorId = req.params.id;
    const Vendor = await findVendor(vendorId);
    if (!Vendor) {
      res.json({ message: 'Vendor does not exist' });
    }

    res.status(200).json(Vendor);
  } catch (error) {
    console.log(error);
  }
};
