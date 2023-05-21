import express, { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import {
  CreateCustomerInput,
  userLoginInputs,
  editCustomerProfileInput,
} from '../dto/Customer.dto';
import { validate } from 'class-validator';
import {
  generateOtp,
  generatePassword,
  generateSalt,
  generateSignature,
  onRequestOTP,
  validatePassword,
} from '../utils';
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

    const existingCustomer = await Customer.findOne({ email: email });

    if (existingCustomer !== null) {
      return res
        .status(409)
        .json({ message: 'A user already exist with this email' });
    }

    const result = await Customer.create({
      email: email,
      password: userPassword,
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
      await onRequestOTP(otp, phone);
      //generate the signature
      const signature = generateSignature({
        _id: result.id,
        email: result.email,
        verified: result.verified,
      });
      //send the result to client

      return res.status(201).json({
        signature: signature,
        verified: result.verified,
        email: result.email,
      });
    }

    return res.status(400).json({ message: 'Error with signature' });
  } catch (error) {
    console.log(error);
  }
};

export const customerLogin = async (req: Request, res: Response) => {
  try {
    const loginInputs = plainToClass(userLoginInputs, req.body);

    const loginErrors = await validate(loginInputs, {
      validationError: { target: false },
    });

    if (loginErrors.length > 0) {
      return res.status(200).json(loginErrors);
    }

    const { email, password } = loginInputs;

    const customer = await Customer.findOne({ email: email });

    if (customer) {
      const validate = await validatePassword(
        password,
        customer.password,
        customer.salt
      );

      if (validate) {
        //generate signature
        const signature = generateSignature({
          _id: customer.id,
          email: customer.email,
          verified: customer.verified,
        });

        //send the result to the client
        return res.status(201).json({
          signature: signature,
          verified: customer.verified,
          email: customer.email,
        });
      }
    }

    return res.status(404).json({ message: 'Login Error' });
  } catch (error) {
    console.log(error);
  }
};

export const customerVerify = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    const customer = req.user;

    if (customer) {
      const profile = await Customer.findById(customer._id);

      if (profile) {
        if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
          profile.verified = true;

          const updateCustomerResponse = await profile.save();

          //generate signature
          const signature = generateSignature({
            _id: updateCustomerResponse.id,
            email: updateCustomerResponse.email,
            verified: updateCustomerResponse.verified,
          });

          return res.status(201).json({
            signature: signature,
            verified: updateCustomerResponse.verified,
            email: updateCustomerResponse.email,
          });
        }
      }
    }

    return res.status(400).json({ message: 'Error with OTP validation' });
  } catch (error) {
    console.log(error);
  }
};

export const requestOTP = async (req: Request, res: Response) => {
  try {
    const customer = req.user;

    if (customer) {
      const profile = await Customer.findById(customer._id);

      if (profile) {
        const { otp, expiry } = generateOtp();

        profile.otp = otp;
        profile.otp_expiry = expiry;

        await profile.save();
        await onRequestOTP(otp, profile.phone);

        res.status(200).json({ message: 'OTP sent to your phone number' });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerProfile = async (req: Request, res: Response) => {
  try {
    const customer = req.user;

    if (customer) {
      const profile = await Customer.findById(customer._id);

      if (profile) {
        return res.status(200).json(profile);
      }
    }

    return res
      .status(404)
      .json({ message: 'Error while getting your profile' });
  } catch (error) {
    console.log(error);
  }
};

export const editCustomerProfile = async (req: Request, res: Response) => {
  try {
    const customer = req.user;

    const profileInputs = plainToClass(editCustomerProfileInput, req.body);

    const profileErrors = await validate(profileInputs, {
      validationError: { target: false },
    });

    if (profileErrors.length > 0) {
      return res.status(200).json(profileErrors);
    }

    const { firstName, lastName, address } = profileInputs;

    if (customer) {
      const profile = await Customer.findById(customer._id);

      if (profile) {
        (profile.firstName = firstName),
          (profile.lastName = lastName),
          (profile.address = address);

        const result = await profile.save();

        res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
