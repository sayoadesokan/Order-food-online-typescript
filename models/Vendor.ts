import mongoose, { Schema, Document, model } from 'mongoose';

interface VendorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: [string];
  pinCode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailable: string;
  coverImage: [string];
  ratings: number;
  //   foods: any;
}

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: {
      type: [String],
      required: true,
    },
    pinCode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: String, required: true },
    coverImage: {
      type: [String],
    },
    ratings: { type: Number },
    //   foods: [
    //     {
    //       type: mongoose.SchemaTypes.ObjectId,
    //       ref: 'Food',
    //     },
    //   ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const vendor = mongoose.model('Vendor', vendorSchema);

export { vendor };
