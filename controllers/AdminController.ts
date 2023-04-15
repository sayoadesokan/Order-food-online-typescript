import { Request, Response, NextFunction } from 'express';
import { createVendorInput } from '../dto/Index';
import { vendor } from '../models/Vendor';
import { generatePassword, generateSalt } from '../utils';

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
  });

  //   const newVendor = await createVendor.save();
  return res.status(200).json(createVendor);

  res.json({
    name,
    address,
    phone,
    pinCode,
    foodType,
    email,
    password,
    ownerName,
  });
};

export const getVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
