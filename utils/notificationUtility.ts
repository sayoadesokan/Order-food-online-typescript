//Email

//Notification

//OTP
export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 908000);
  let expiry = new Date();

  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, to: string) => {};

//payment notification or emails
