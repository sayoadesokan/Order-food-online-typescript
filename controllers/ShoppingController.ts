import express, { Request, Response, NextFunction } from 'express';
import { vendor } from '../models/Vendor';

export const getFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pincode = req.params.pincode;

    const result = await vendor
      .find({
        pincode: pincode,
        serviceAvailable: true,
      })
      .sort([['rating', 'descending']])
      .populate('foods');

    if (result.length > 0) {
      return res.status(200).json(result);
    }

    return res.status(400).json('Data not found');
  } catch (error) {
    console.log(error);
  }
};

export const getTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pincode = req.params.pincode;

    const result = await vendor
      .find({
        pincode: pincode,
        serviceAvailable: true,
      })
      .sort([['rating', 'descending']])
      .limit(1);

    if (result.length > 0) {
      return res.status(200).json(result);
    }

    return res.status(400).json('Data not found');
  } catch (error) {
    console.log(error);
  }
};

export const getFoodIn30mins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const searchFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const restaurantsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
