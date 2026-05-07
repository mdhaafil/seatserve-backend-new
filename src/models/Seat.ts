import mongoose, { Schema, Document } from "mongoose";

export interface ISeat extends Document {
  seatId: string;
  row: string;
  number: number;
  type: string;
  price: number;
  isBooked: boolean;
}

const SeatSchema = new Schema<ISeat>(
  {
    seatId: {
      type: String,
      required: true,
      unique: true,
    },
    row: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ISeat>("Seat", SeatSchema);
