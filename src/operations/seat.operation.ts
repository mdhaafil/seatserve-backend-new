import Seat from "../models/Seat";

export const getAllSeats = async () => {
  return await Seat.find().sort({ row: 1, number: 1 });
};

export const bookSeats = async (seatIds: string[]) => {
  const alreadyBooked = await Seat.find({
    seatId: { $in: seatIds },
    isBooked: true,
  });

  if (alreadyBooked.length > 0) {
    throw new Error(
      `Seats already booked: ${alreadyBooked.map((s) => s.seatId).join(", ")}`,
    );
  }

  return await Seat.updateMany(
    { seatId: { $in: seatIds } },
    { $set: { isBooked: true } },
  );
};
