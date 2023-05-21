import { TWILLO_ACCOUNT_ID, TWILLO_AUTHTOKEN } from '../config/Index';

//Email

//Notification

//OTP
export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 908000);
  let expiry = new Date();

  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  const accountId = TWILLO_ACCOUNT_ID;
  const authToken = TWILLO_AUTHTOKEN;

  const client = require('twilio')(accountId, authToken);

  const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: '',
    to: toPhoneNumber,
  });

  return response;
};

//payment notification or emails
