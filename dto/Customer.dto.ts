import { IsEmail, IsEmpty, Length } from 'class-validator';

export class CreateCustomerInput {
  @IsEmail()
  email: string;

  @Length(7, 12)
  phone: string;

  @Length(6, 12)
  password: string;
}

export class userLoginInputs {
  @IsEmail()
  email: string;

  @Length(6, 12)
  password: string;
}

export class editCustomerProfileInput {
  @Length(6, 12)
  firstName: string;

  @Length(6, 12)
  lastName: string;

  @Length(6, 12)
  address: string;
}

export interface customerPayload {
  _id: string;
  email: string;
  verified: boolean;
}
