import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { vendorPayload } from '../dto/Vendor.dto';
import { APP_SECRET } from '../config/Index';
import { authPayload } from '../dto/Auth.dto';

export const generateSalt = async () => {
  return bcrypt.genSalt();
};

export const generatePassword = async (password: string, salt: string) => {
  return bcrypt.hash(password, salt);
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await generatePassword(enteredPassword, salt)) === savedPassword;
};

export const generateSignature = async (payload: vendorPayload) => {
  return jwt.sign(payload, APP_SECRET, {
    expiresIn: '1d',
  });
};

export const validateSignature = async (req: Request) => {
  const signature = req.get('Authorization');

  if (signature) {
    const payload = (await jwt.verify(
      signature.split(' ')[1],
      APP_SECRET
    )) as authPayload;

    req.user = payload;

    return true;
  }

  return false;
};
