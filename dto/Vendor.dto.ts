export interface createVendorInput {
  name: string;
  ownerName: string;
  pinCode: string;
  foodType: [string];
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface vendorLoginInputs {
  email: string;
  password: string;
}

export interface editVendorInputs {
  name: string;
  foodType: [string];
  address: string;
  phone: string;
}

export interface vendorPayload {
  _id: string;
  email: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: vendorPayload;
    }
  }
}
