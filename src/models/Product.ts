import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  beforePrice: number;
  offer: number;
  afterPrice: number;
  image: string;
  stock: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },

    beforePrice: { type: Number, required: true },
    offer: { type: Number, required: true },

    afterPrice: { type: Number, required: true },

    image: { type: String, required: true },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

ProductSchema.pre("save", function (next) {
  this.afterPrice =
    this.beforePrice -
    (this.beforePrice * this.offer) / 100;
  next();
});

export const Product = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);
