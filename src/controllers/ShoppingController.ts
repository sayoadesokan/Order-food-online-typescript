import express, { Request, Response, NextFunction } from 'express';
import { vendor } from '../models/Vendor';
import { FoodDoc } from '../models/Food';

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
    const pincode = req.params.pincode;

    const result = await vendor
      .find({
        pincode: pincode,
        serviceAvailable: true,
      })
      .sort([['rating', 'descending']])
      .populate({
        path: 'foods',
        match: { readyTime: { $lte: 30 } },
      })
      .lean(); // Add .lean() to retrieve plain JavaScript objects

    if (result.length > 0) {
      const foodResult: FoodDoc[] = [];

      result.forEach((vendor: any) => {
        // Use 'any' type for vendor
        const foods = vendor.foods as FoodDoc[]; // Cast to FoodDoc[]

        foodResult.push(...foods);
      });

      return res.status(200).json(foodResult);
    }

    return res.status(400).json('Data not found');
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
    const pincode = req.params.pincode;

    const result = await vendor
      .find({
        pincode: pincode,
        serviceAvailable: true,
      })
      .populate('foods');

    if (result.length > 0) {
      let foodResult: any = [];

      result.map((item) => foodResult.push(...item.foods));

      return res.status(200).json(foodResult);
    }

    return res.status(400).json('Data not found');
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
    const id = req.params.id;

    const result = await vendor.findById(id).populate('foods');

    if (result) {
      return res.status(200).json(result);
    }

    return res.status(400).json('Data not found');
  } catch (error) {
    console.log(error);
  }
};
