import mongoose, { Schema, Document } from 'mongoose';

export interface FoodDoc extends Document {
  name: string;
  description: string;
  category: string;
  foodTYpe: string;
  readyTime: number;
  price: number;
  rating: number;
  images: [string];
}

const foodSchema = new Schema(
  {
    vendorId: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    foodType: { type: String, required: true },
    price: { type: Number, required: true },
    rating: Number,
    image: [String],
  },
  {
    toJSON: {
      transform(dec, ret) {
        delete ret.__v, delete ret.createdAt, delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Food = mongoose.model<FoodDoc>('Food', foodSchema);

export { Food };
