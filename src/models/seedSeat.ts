import mongoose from "mongoose";
import Seat from "./Seat";

const seats: any[] = [];

["A", "B", "C", "D"].forEach((row) => {
  for (let i = 1; i <= 10; i++) {
    seats.push({ seatNo: `${row}${i}` });
  }
});

const seed = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/seatserve");
  await Seat.deleteMany();
  await Seat.insertMany(seats);
  console.log("Seats seeded");
  process.exit();
};

seed();
