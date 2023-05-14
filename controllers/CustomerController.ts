import express, { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { CreateCustomerInput } from '../dto/Customer.dto';
import { validate } from 'class-validator';
import { generateOtp, generatePassword, generateSalt } from '../utils';
import { Customer } from '../models/Customer';

export const customerSignUp = async (req: Request, res: Response) => {
  try {
    const customerInput = plainToClass(CreateCustomerInput, req.body);

    const inputErrors = await validate(customerInput, {
      validationError: { target: true },
    });

    if (inputErrors.length > 0) {
      return res.status(200).json(inputErrors);
    }

    const { email, phone, password } = customerInput;

    const salt = await generateSalt();

    const userPassword = await generatePassword(password, salt);
    const { otp, expiry } = generateOtp();

    console.log(otp, expiry);

    return res.json('working....');

    const result = await Customer.create({
      email: email,
      password: password,
      salt: salt,
      otp: otp,
      phone: phone,
      otp_expiry: expiry,
      firstName: '',
      lastName: '',
      address: '',
      verified: false,
      lat: 0,
      lng: 0,
    });

    if (result) {
      //send the OTP to customer
      //generate the signature
      //send the result to client
    }
  } catch (error) {
    console.log(error);
  }
};

export const customerLogin = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const customerVerify = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const requestOTP = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerProfile = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const editCustomerProfile = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
