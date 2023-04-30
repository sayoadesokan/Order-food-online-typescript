import mongoose, { Schema, Document, model } from 'mongoose';

interface FoodDoc extends Document {
  vendorId: string;
  name: string;
  description: string;
  category: string;
  foodTypes: string;
  readyTime: string;
  price: number;
  rating: number;
  images: [string];
}

const foodSchema = new Schema(
  {
    vendorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    foodType: { type: String, required: true },
    readyTime: String,
    price: { type: Number, required: true },
    rating: Number,
    images: [String],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v, delete ret.createdAt, delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Food = mongoose.model('Food', foodSchema);

export { Food };
