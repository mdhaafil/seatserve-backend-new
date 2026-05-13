"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSeats = exports.getAllSeats = void 0;
const Seat_1 = __importDefault(require("../models/Seat"));
const getAllSeats = async () => {
    return await Seat_1.default.find().sort({ row: 1, number: 1 });
};
exports.getAllSeats = getAllSeats;
const bookSeats = async (seatIds) => {
    const alreadyBooked = await Seat_1.default.find({
        seatId: { $in: seatIds },
        isBooked: true,
    });
    if (alreadyBooked.length > 0) {
        throw new Error(`Seats already booked: ${alreadyBooked.map((s) => s.seatId).join(", ")}`);
    }
    return await Seat_1.default.updateMany({ seatId: { $in: seatIds } }, { $set: { isBooked: true } });
};
exports.bookSeats = bookSeats;
