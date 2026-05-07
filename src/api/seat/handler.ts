import { Request, ResponseToolkit } from "@hapi/hapi";
import Seat from "../../models/Seat";

/**
 * GET ALL SEATS
 * --------------------------------
 * Shows all seats (green/red handled in frontend)
 */
export const getAllSeatsHandler = async (
  request: Request,
  h: ResponseToolkit,
) => {
  try {
    const seats = await Seat.find().sort({ row: 1, number: 1 });

    return h
      .response({
        message: "Seats fetched successfully",
        data: seats,
      })
      .code(200);
  } catch (error) {
    console.error("GET SEATS ERROR:", error);
    return h.response({ message: "Server error" }).code(500);
  }
};

/**
 * BOOK SEATS
 * --------------------------------
 * Books selected seats (A1, A2...)
 */
export const bookSeatsHandler = async (
  request: Request,
  h: ResponseToolkit,
) => {
  try {
    const payload = request.payload as any;

    // 🔒 SAFETY CHECK (fixes your crash)
    if (!payload || !payload.seats) {
      return h.response({ message: '"seats" is required' }).code(400);
    }

    const seats: string[] = payload.seats;

    if (!Array.isArray(seats) || seats.length === 0) {
      return h.response({ message: "Seats array must not be empty" }).code(400);
    }

    // 🚫 Check already booked seats
    const alreadyBooked = await Seat.find({
      seatId: { $in: seats },
      isBooked: true,
    });

    if (alreadyBooked.length > 0) {
      return h
        .response({
          message: "Some seats are already booked",
          seats: alreadyBooked.map((s) => s.seatId),
        })
        .code(409);
    }

    // ✅ Book seats
    const result = await Seat.updateMany(
      { seatId: { $in: seats } },
      { $set: { isBooked: true } },
    );

    return h
      .response({
        message: "Seats booked successfully",
        bookedSeats: seats,
        count: result.modifiedCount,
      })
      .code(200);
  } catch (error) {
    console.error("BOOK SEATS ERROR:", error);
    return h.response({ message: "Server error" }).code(500);
  }
};

/**
 * RESET ALL SEATS (ADMIN / CRON)
 * --------------------------------
 * Makes all seats available again
 */
export const resetSeatsHandler = async (
  request: Request,
  h: ResponseToolkit,
) => {
  try {
    await Seat.updateMany({}, { $set: { isBooked: false } });

    return h
      .response({
        message: "All seats reset successfully",
      })
      .code(200);
  } catch (error) {
    console.error("RESET SEATS ERROR:", error);
    return h.response({ message: "Server error" }).code(500);
  }
};
