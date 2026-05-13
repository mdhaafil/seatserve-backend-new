"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetSeatsHandler = exports.bookSeatsHandler = exports.getAllSeatsHandler = void 0;
const Seat_1 = __importDefault(require("../../models/Seat"));
/**
 * GET ALL SEATS
 * --------------------------------
 * Shows all seats (green/red handled in frontend)
 */
const getAllSeatsHandler = async (request, h) => {
    try {
        const seats = await Seat_1.default.find().sort({ row: 1, number: 1 });
        return h
            .response({
            message: "Seats fetched successfully",
            data: seats,
        })
            .code(200);
    }
    catch (error) {
        console.error("GET SEATS ERROR:", error);
        return h.response({ message: "Server error" }).code(500);
    }
};
exports.getAllSeatsHandler = getAllSeatsHandler;
/**
 * BOOK SEATS
 * --------------------------------
 * Books selected seats (A1, A2...)
 */
const bookSeatsHandler = async (request, h) => {
    try {
        const payload = request.payload;
        // 🔒 SAFETY CHECK (fixes your crash)
        if (!payload || !payload.seats) {
            return h.response({ message: '"seats" is required' }).code(400);
        }
        const seats = payload.seats;
        if (!Array.isArray(seats) || seats.length === 0) {
            return h.response({ message: "Seats array must not be empty" }).code(400);
        }
        // 🚫 Check already booked seats
        const alreadyBooked = await Seat_1.default.find({
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
        const result = await Seat_1.default.updateMany({ seatId: { $in: seats } }, { $set: { isBooked: true } });
        return h
            .response({
            message: "Seats booked successfully",
            bookedSeats: seats,
            count: result.modifiedCount,
        })
            .code(200);
    }
    catch (error) {
        console.error("BOOK SEATS ERROR:", error);
        return h.response({ message: "Server error" }).code(500);
    }
};
exports.bookSeatsHandler = bookSeatsHandler;
/**
 * RESET ALL SEATS (ADMIN / CRON)
 * --------------------------------
 * Makes all seats available again
 */
const resetSeatsHandler = async (request, h) => {
    try {
        await Seat_1.default.updateMany({}, { $set: { isBooked: false } });
        return h
            .response({
            message: "All seats reset successfully",
        })
            .code(200);
    }
    catch (error) {
        console.error("RESET SEATS ERROR:", error);
        return h.response({ message: "Server error" }).code(500);
    }
};
exports.resetSeatsHandler = resetSeatsHandler;
